/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import { MESSAGE_ROLES } from '../../constants/playground.constants';
import { loadMessages, clearMessages } from './configStorage';

export const CONVERSATIONS_STORAGE_KEY = 'playground_conversations';

const MAX_CONVERSATIONS = 200;

function emptyStore() {
  return { conversations: [] };
}

export function getTextFromMessage(message) {
  if (!message?.content) return '';
  if (typeof message.content === 'string') return message.content.trim();
  if (Array.isArray(message.content)) {
    return message.content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part?.type === 'text' && part.text) return part.text;
        return '';
      })
      .join(' ')
      .trim();
  }
  return '';
}

export function hasPersistableMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  return messages.some(
    (m) => m.role === MESSAGE_ROLES.USER && getTextFromMessage(m).length > 0,
  );
}

export function generateConversationTitle(messages, fallback = 'New Chat') {
  const firstUser = messages?.find(
    (m) => m.role === MESSAGE_ROLES.USER && getTextFromMessage(m),
  );
  const text = firstUser ? getTextFromMessage(firstUser) : '';
  if (!text) return fallback;
  const singleLine = text.replace(/\s+/g, ' ').trim();
  return singleLine.length > 48 ? `${singleLine.slice(0, 48)}…` : singleLine;
}

export function loadConversationStore() {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.conversations)) return emptyStore();
    return { conversations: parsed.conversations };
  } catch {
    return emptyStore();
  }
}

function saveConversationStore(store) {
  try {
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('保存聊天记录失败:', error);
  }
}

export function listConversations() {
  return loadConversationStore()
    .conversations.slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getConversation(id) {
  if (!id) return null;
  return loadConversationStore().conversations.find((c) => c.id === id) || null;
}

export function upsertConversation({ id, messages, title }) {
  if (!hasPersistableMessages(messages)) return null;

  const store = loadConversationStore();
  const now = new Date().toISOString();
  const existingIndex = id
    ? store.conversations.findIndex((c) => c.id === id)
    : -1;

  const record = {
    id: id || crypto.randomUUID(),
    title: title || generateConversationTitle(messages),
    messages,
    createdAt:
      existingIndex >= 0
        ? store.conversations[existingIndex].createdAt
        : now,
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    store.conversations[existingIndex] = record;
  } else {
    store.conversations.unshift(record);
  }

  store.conversations.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
  if (store.conversations.length > MAX_CONVERSATIONS) {
    store.conversations = store.conversations.slice(0, MAX_CONVERSATIONS);
  }

  saveConversationStore(store);
  return record.id;
}

export function deleteConversation(id) {
  const store = loadConversationStore();
  store.conversations = store.conversations.filter((c) => c.id !== id);
  saveConversationStore(store);
}

export function searchConversations(keyword) {
  const q = (keyword || '').trim().toLowerCase();
  const all = listConversations();
  if (!q) return all;

  return all.filter((conv) => {
    if (conv.title?.toLowerCase().includes(q)) return true;
    return conv.messages?.some((m) =>
      getTextFromMessage(m).toLowerCase().includes(q),
    );
  });
}

export function migrateLegacyPlaygroundMessages(defaultTitle) {
  const legacy = loadMessages();
  if (!hasPersistableMessages(legacy)) return null;

  const store = loadConversationStore();
  if (store.conversations.length > 0) return null;

  const id = upsertConversation({
    messages: legacy,
    title: generateConversationTitle(legacy, defaultTitle),
  });
  clearMessages();
  return id;
}

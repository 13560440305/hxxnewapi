/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Empty,
  Input,
  Modal,
  Typography,
} from '@douyinfe/semi-ui';
import { MessageSquare, Search, Trash2 } from 'lucide-react';
import {
  deleteConversation,
  listConversations,
  searchConversations,
} from '../../components/playground/conversationStorage';

const { Title, Text } = Typography;

const formatWhen = (iso, locale) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString(locale);
  } catch {
    return iso;
  }
};

const ChatHistory = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState(() => listConversations());

  const refresh = useCallback(() => {
    setItems(searchConversations(keyword));
  }, [keyword]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const locale = useMemo(() => {
    if (i18n.language === 'en') return 'en-US';
    if (i18n.language === 'zh-TW') return 'zh-TW';
    return 'zh-CN';
  }, [i18n.language]);

  const handleOpen = (id) => {
    navigate(`/console/playground?c=${encodeURIComponent(id)}`);
  };

  const handleDelete = (id, title) => {
    Modal.confirm({
      title: t('确认删除此聊天？'),
      content: title,
      okType: 'danger',
      onOk: () => {
        deleteConversation(id);
        refresh();
      },
    });
  };

  return (
    <div className='mx-auto mt-[60px] w-full max-w-3xl px-4 py-8 md:px-6'>
      <div className='mb-6'>
        <Title heading={3} className='!mb-2'>
          {t('搜索聊天')}
        </Title>
        <Text type='tertiary'>{t('搜索并打开历史聊天记录')}</Text>
      </div>

      <Input
        prefix={<Search size={16} className='text-semi-color-text-2' />}
        placeholder={t('搜索聊天记录…')}
        value={keyword}
        onChange={setKeyword}
        showClear
        size='large'
        className='!mb-6'
      />

      {items.length === 0 ? (
        <Empty
          image={<MessageSquare size={48} className='text-semi-color-text-2' />}
          title={t('暂无聊天记录')}
          description={t('开始新对话后，发送消息将自动保存')}
        />
      ) : (
        <ul className='space-y-3'>
          {items.map((item) => (
            <li
              key={item.id}
              className='flex items-center gap-3 rounded-xl border border-semi-color-border bg-semi-color-bg-1 px-4 py-3 transition hover:border-semi-color-primary'
            >
              <button
                type='button'
                className='min-w-0 flex-1 text-left'
                onClick={() => handleOpen(item.id)}
              >
                <div className='truncate font-medium text-semi-color-text-0'>
                  {item.title || t('未命名聊天')}
                </div>
                <div className='mt-1 text-xs text-semi-color-text-2'>
                  {formatWhen(item.updatedAt, locale)}
                </div>
              </button>
              <Button
                theme='borderless'
                type='tertiary'
                icon={<Trash2 size={16} />}
                aria-label={t('删除聊天')}
                onClick={() => handleDelete(item.id, item.title)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;

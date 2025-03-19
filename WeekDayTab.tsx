import React, { useState, useEffect } from 'react';
import { View, Text } from '@ray-js/components';
import './styles.less';

export interface TabItem {
  key: string;
  label: string;
  date: number;
  isToday?: boolean;
}

export interface WeekDayTabProps {
  tabs: TabItem[];
  activeKey: string;
  onChange?: (key: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const WeekDayTab: React.FC<WeekDayTabProps> = ({
  tabs,
  activeKey,
  onChange,
  className = '',
  style = {},
}) => {
  const [currentKey, setCurrentKey] = useState(activeKey || (tabs[0]?.key || ''));

  useEffect(() => {
    if (activeKey && activeKey !== currentKey) {
      setCurrentKey(activeKey);
    }
  }, [activeKey]);

  const handleTabClick = (key: string) => {
    setCurrentKey(key);
    onChange?.(key);
  };

  return (
    <View className={`weekday-tab ${className}`} style={style}>
      <View className="weekday-tab-list">
        {tabs.map(tab => (
          <View
            key={tab.key}
            className={`weekday-tab-item ${currentKey === tab.key ? 'active' : ''} ${tab.isToday ? 'today' : ''}`}
            onClick={() => handleTabClick(tab.key)}
          >
            <Text className="weekday-tab-label">{tab.isToday ? '今天' : tab.label}</Text>
            <Text className="weekday-tab-date">{tab.date}</Text>
            {currentKey === tab.key && <View className="weekday-tab-indicator" />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeekDayTab; 
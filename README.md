# WeekDayTab 组件

一个用于 Ray.js 环境的星期选项卡组件，支持周一至周日以及"今天"的显示，并提供日期标记功能。

![WeekDayTab预览](https://placeholder-for-screenshot.png)

## 特性

- 显示周一至周日的选项卡
- 上方显示星期名称（例如"周一"），下方显示日期数字
- 支持"今天"特殊标记
- 选中项有蓝色下划线和文字高亮
- 适配 Ray.js 环境，支持移动触摸操作

## 安装

组件已内置在项目中，无需额外安装。位置：

```
src/components/WeekDayTab/
```

## 使用方法

### 基本用法

```tsx
import React, { useState } from 'react';
import { View } from '@ray-js/components';
import WeekDayTab, { TabItem } from '../../components/WeekDayTab';

const MyPage: React.FC = () => {
  // 准备Tab数据
  const tabs: TabItem[] = [
    { key: 'mon', label: '周一', date: 13 },
    { key: 'tue', label: '周二', date: 14 },
    { key: 'wed', label: '周三', date: 15 },
    { key: 'thu', label: '周四', date: 16 },
    { key: 'fri', label: '周五', date: 17 },
    { key: 'sat', label: '周六', date: 18 },
    { key: 'sun', label: '周日', date: 19, isToday: true }
  ];
  
  const [activeKey, setActiveKey] = useState('mon');
  
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // 处理选项卡变化的逻辑
  };
  
  return (
    <View>
      <WeekDayTab 
        tabs={tabs} 
        activeKey={activeKey} 
        onChange={handleTabChange} 
      />
    </View>
  );
};

export default MyPage;
```

### 自动生成最近一周数据

```tsx
import React, { useState } from 'react';
import { View } from '@ray-js/components';
import WeekDayTab, { TabItem } from '../../components/WeekDayTab';

const MyPage: React.FC = () => {
  // 生成最近一周的日期数据
  const generateWeekTabs = () => {
    const tabs: TabItem[] = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0是周日，1是周一...
    
    // 确保正确的星期顺序：周一到周日
    const dayLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    
    // 从今天开始计算一周内的日期
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - (dayOfWeek === 0 ? 7 : dayOfWeek) + i + 1);
      
      const day = date.getDate();
      const isToday = date.toDateString() === today.toDateString();
      
      tabs.push({
        key: `day-${i}`,
        label: dayLabels[i],
        date: day,
        isToday
      });
    }
    
    return tabs;
  };

  const weekTabs = generateWeekTabs();
  // 默认选中今天
  const defaultKey = weekTabs.find(tab => tab.isToday)?.key || weekTabs[0].key;
  const [activeKey, setActiveKey] = useState(defaultKey);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <View>
      <WeekDayTab 
        tabs={weekTabs} 
        activeKey={activeKey} 
        onChange={handleTabChange} 
      />
    </View>
  );
};

export default MyPage;
```

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabs | 选项卡数据 | TabItem[] | [] |
| activeKey | 当前选中项的key | string | - |
| onChange | 选项卡切换时的回调函数 | (key: string) => void | - |
| className | 自定义类名 | string | '' |
| style | 自定义样式 | React.CSSProperties | {} |

### TabItem类型

```typescript
interface TabItem {
  key: string;      // 唯一标识
  label: string;    // 标签文本（如"周一"）
  date: number;     // 日期数字（如13）
  isToday?: boolean; // 是否为今天
}
```

## 样式定制

通过 `className` 和 `style` 属性可以对组件进行样式定制。如需深度定制，可以修改 `styles.less` 文件中的样式。

主要的样式类：

- `.weekday-tab` - 整个选项卡组件
- `.weekday-tab-list` - 选项卡列表
- `.weekday-tab-item` - 单个选项卡项
- `.weekday-tab-label` - 星期标签
- `.weekday-tab-date` - 日期数字
- `.weekday-tab-indicator` - 选中项指示器
- `.weekday-tab-item.active` - 选中状态的选项卡项
- `.weekday-tab-item.today` - 今天的选项卡项

## 注意事项

1. 确保提供唯一的 `key` 值给每个选项卡项
2. 为了最佳体验，建议使用 7 个选项卡项代表一周
3. 使用 `isToday` 属性来标记当天日期，将自动显示为"今天"
4. 组件默认使用蓝色(#2196f3)作为高亮颜色，可以通过修改 `styles.less` 文件来自定义 
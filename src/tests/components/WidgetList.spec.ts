import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WidgetList from '../../components/WidgetList.vue'


describe('WidgetList', () => {
  it('отображает заголовок и пустое состояние', () => {
    const wrapper = mount(WidgetList);
    
    console.log('wrapper', wrapper);

    expect(wrapper.text()).toContain('Список виджетов');
    expect(wrapper.text()).toContain('+ Добавить виджет');

  });
}); 

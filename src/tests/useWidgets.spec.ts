import { describe, it, expect } from 'vitest'
import { useWidgets } from '../composables/useWidgets'
import type { WidgetType } from '../types/widget'


describe('useWidgets', () => {
    it('test initial state', () => {
        const { widgets, showModal } = useWidgets()

        expect(widgets.value).toEqual([])
        expect(showModal.value).toBe(false)
    })

    it('add widget test', () => {
        const { widgets, addWidget} = useWidgets();

        const widgetData: { name: string; type: WidgetType } = {
            name: 'Chart Widget',
            type: 'chart',
        };

        addWidget(widgetData);

        expect(widgets.value).toHaveLength(1);

        expect(widgets.value[0]).toEqual({
            id: 1,
            name: 'Chart Widget',
            type: 'chart',
            status: 'active',
        });
    });

    it('toggle widget status test', () => {
        const {widgets, addWidget, toggleStatus} = useWidgets();

        const widgetData: { name: string; type: WidgetType } = {
            name: 'Chart Widget',
            type: 'chart',
        };

        addWidget(widgetData);

        expect(widgets.value[0].status).toBe('active');

        toggleStatus(1);

        expect(widgets.value[0].status).toBe('inactive');
    })

    it('remove widget test', () => {
        const { widgets, addWidget, removeWidget } = useWidgets();

        const widgetData: { name: string; type: WidgetType } = {
            name: 'Chart Widget',
            type: 'chart',
        };

        addWidget(widgetData);
        expect(widgets.value).toHaveLength(1);

        removeWidget(1);
        expect(widgets.value).toHaveLength(0);
    });

    it('open and close modal test', () => {
        const { showModal, openModal, closeModal } = useWidgets();

        expect(showModal.value).toBe(false);

        openModal();
        expect(showModal.value).toBe(true);

        closeModal();
        expect(showModal.value).toBe(false);
    });

    it('handleAdd test', () => {
        const { handleAdd, widgets, showModal } = useWidgets();

        const widgetData: { name: string; type: WidgetType } = {
            name: 'Note Widget',
            type: 'note',
        };

        handleAdd(widgetData);

        expect(widgets.value).toHaveLength(1);
        expect(widgets.value[0]).toEqual({
            id: 1,
            name: 'Note Widget',
            type: 'note',
            status: 'active',
        });
        expect(showModal.value).toBe(false);
    });
    
});
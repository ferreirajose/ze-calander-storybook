import { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from './calendar.component';

// Metadados da história
const meta: Meta<CalendarComponent> = {
  title: 'Components/Calendar', // Nome da categoria no Storybook
  component: CalendarComponent,
  tags: ['autodocs'],
  argTypes: {
    listEventMonth: {
      control: 'object',
      description: 'Lista de eventos que aplica estilos personalizados às datas do calendário',
    },
    style: {
      control: 'select',
      options: ['bootstrap', 'material', 'tce', 'default'],
      description: 'Estilo dinâmico aplicado ao calendário',
    },
  },
};

export default meta;

// Definir a história padrão
export const Default: StoryObj<CalendarComponent> = {
  args: {
    listEventMonth: [
      {
        date: '2024-10-02',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #0EA5E9',
      },
      {
        date: '2024-10-05',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
      },
    ],
    style: 'default',
  },
};

// Outra variante do componente com estilo Bootstrap
export const BootstrapStyle: StoryObj<CalendarComponent> = {
  args: {
    listEventMonth: [
      {
        date: '2024-10-06',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
      },
      {
        date: '2024-10-09',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #003D67',
      },
    ],
    style: 'bootstrap',
  },
};

// Outra variante do componente com estilo TCE
export const TceStyle: StoryObj<CalendarComponent> = {
  args: {
    listEventMonth: [
      {
        date: '2024-10-06',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
      },
      {
        date: '2024-10-09',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #003D67',
      },
    ],
    style: 'tce',
  },
};

// Outra variante do componente com estilo Material
export const MaterialStyle: StoryObj<CalendarComponent> = {
  args: {
    listEventMonth: [
      {
        date: '2024-10-06',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
      },
      {
        date: '2024-10-09',
        textColor: '#000',
        backgroundColor: '#FFCFAB',
        border: '2px solid #003D67',
      },
    ],
    style: 'material',
  },
};

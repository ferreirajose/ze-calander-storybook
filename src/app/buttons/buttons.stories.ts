import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonsComponent } from './buttons.component';

export default {
  title: 'Components/Buttons',
  component: ButtonsComponent,
  tags: ['autodocs'],
  render: (args: ButtonsComponent) => ({
    props: {
      ...args
    }
  }),
} as Meta<ButtonsComponent>;

type ButtonComponentStory = StoryObj<ButtonsComponent>;
export const Primary: ButtonComponentStory = {
  args: {
    label: 'Primary'
  }
}

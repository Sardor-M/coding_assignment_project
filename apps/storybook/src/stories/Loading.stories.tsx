import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from '@repo/ui';

const meta = {
    title: 'Components/Loading',
    component: Loading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'white'],
        },
    },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        size: 'md',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'md',
    },
};

export const White: Story = {
    args: {
        variant: 'white',
        size: 'md',
    },
    decorators: [
        Story => (
            <div className="bg-gray-800 p-8 rounded-lg">
                <Story />
            </div>
        ),
    ],
};

export const Small: Story = {
    args: {
        size: 'sm',
        variant: 'primary',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        variant: 'primary',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        variant: 'primary',
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-8">
            <div className="text-center">
                <Loading size="sm" variant="primary" className="mb-2" />
                <p className="text-sm text-gray-600">Small</p>
            </div>
            <div className="text-center">
                <Loading size="md" variant="primary" className="mb-2" />
                <p className="text-sm text-gray-600">Medium</p>
            </div>
            <div className="text-center">
                <Loading size="lg" variant="primary" className="mb-2" />
                <p className="text-sm text-gray-600">Large</p>
            </div>
        </div>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex items-center gap-8">
            <div className="text-center">
                <Loading size="md" variant="primary" className="mb-2" />
                <p className="text-sm text-gray-600">Primary</p>
            </div>
            <div className="text-center">
                <Loading size="md" variant="secondary" className="mb-2" />
                <p className="text-sm text-gray-600">Secondary</p>
            </div>
            <div className="text-center bg-gray-800 p-4 rounded-lg">
                <Loading size="md" variant="white" className="mb-2" />
                <p className="text-sm text-white">White</p>
            </div>
        </div>
    ),
};

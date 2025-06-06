#!/bin/sh

# kebab-caseをPascalCaseに変換したものを変数に格納
# 例: button-group -> ButtonGroup
CAMEL_NAME=$(echo "$1" | awk -F '-' '{ for(i=1; i<=NF; i++) {printf toupper(substr($i,1,1)) substr($i,2)}} END {print ""}')

# Install by shadcn
npx shadcn@latest add $1
mkdir src/components/$1
mv src/components/ui/$1.tsx src/components/$1/index.tsx
rm -r src/components/ui
touch src/components/$1/index.stories.tsx
echo "import type { Meta, StoryObj } from '@storybook/react';
import { $CAMEL_NAME } from './index';

const meta: Meta<typeof $CAMEL_NAME> = {
  title: 'Components/$CAMEL_NAME',
  component: $CAMEL_NAME,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // 引数の設定
  },
} satisfies Meta<typeof $CAMEL_NAME>;

export default meta;
type Story = StoryObj<typeof $CAMEL_NAME>;

export const Default: Story = {
  args: {
    // デフォルトの引数をここに設定
  },
};" > src/components/$1/index.stories.tsx
touch src/components/$1/item.json
echo "{
  \"$schema\": \"https://ui.shadcn.com/schema/registry-item.json\",
  \"title\": \"$CAMEL_NAME\",
  \"name\": \"$1\",
  \"description\": \"\",
  \"type\": \"registry:component\",
  \"files\": [
    {
      \"path\": \"src/components/$1/index.tsx\",
      \"type\": \"registry:component\"
    }
  ]
}" > src/components/$1/item.json

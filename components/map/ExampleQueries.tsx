import React from 'react';
import { Badge } from '../ui/badge';

interface ExampleQueriesProps {
  onQuerySelect: (query: string) => void;
}

const examples = [
  'Show me the five best coffee places',
  'Find restaurants with canal view',
  'Coffee shops in Nørrebro',
  'Places open now',
  'Restaurants near Nyhavn',
  'Casual dining with outdoor seating',
  'Top rated cafés',
  'Hidden gem restaurants',
];

export const ExampleQueries: React.FC<ExampleQueriesProps> = ({ onQuerySelect }) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Try these examples:</p>
      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <Badge
            key={example}
            variant="secondary"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
            onClick={() => onQuerySelect(example)}
          >
            {example}
          </Badge>
        ))}
      </div>
    </div>
  );
};

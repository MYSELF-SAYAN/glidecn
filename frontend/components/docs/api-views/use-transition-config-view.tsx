'use client';

import React from 'react';
import { Sliders, Braces, ArrowRightLeft, Clock } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  DocHero,
  SectionTwoCol,
  PropsCard,
  AccordionItem,
  BottomNavCards,
  type PropItem,
} from '@/components/docs/api-shared';

const HOOK_RETURNS: PropItem[] = [
  {
    name: 'config',
    type: 'Required<TransitionConfig>',
    description: 'Current resolved timing parameters: duration, delay, ease, direction, stagger, custom.',
  },
  {
    name: 'setConfig',
    type: '(config: TransitionConfig) => void',
    description: 'Function to dynamically mutate timing or directional parameters on the fly.',
  },
];

export function DocsUseTransitionConfigView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="React Hook"
        title="useTransitionConfig()"
        description="A lightweight convenience hook to read the resolved configuration and dynamically update transition settings without full state overhead."
        importSnippet="import { useTransitionConfig } from '@/components/glidecn';"
      />

      {/* 2. SIGNATURE & RETURNS */}
      <SectionTwoCol
        icon={<Sliders className="size-5" />}
        title="Signature & Returns"
        description={
          <p>
            Extracts only <code>&#123; config, setConfig &#125;</code> from the GlideCN context. Perfect for settings panels, speed sliders, and direction toggles.
          </p>
        }
      >
        <CodeBlock badge="Signature" code={`const { config, setConfig } = useTransitionConfig();`} />
        <PropsCard title="useTransitionConfig() Return Object" props={HOOK_RETURNS} />
      </SectionTwoCol>

      {/* 3. CODE EXAMPLES */}
      <SectionTwoCol
        icon={<ArrowRightLeft className="size-5" />}
        title="Code Examples"
        description={
          <p>
            Practical patterns for manipulating transition speed and directional flow.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="1. Direction Switcher Toggle"
            description="Toggle horizontal slide flow from left to right on button click."
            badge="Direction Toggle"
            code={`import { useTransitionConfig } from '@/components/glidecn';\n\nexport function DirectionToggle() {\n  const { config, setConfig } = useTransitionConfig();\n\n  const toggleAxis = () => {\n    setConfig({\n      direction: config.direction === 'left' ? 'right' : 'left',\n    });\n  };\n\n  return (\n    <button onClick={toggleAxis}>\n      Current Direction: {config.direction}\n    </button>\n  );\n}`}
          />

          <AccordionItem
            title="2. Transition Duration Slider"
            description="Allow users to dynamically adjust global transition timing with an interactive range slider."
            badge="Duration Slider"
            code={`import { useTransitionConfig } from '@/components/glidecn';\n\nexport function SpeedSlider() {\n  const { config, setConfig } = useTransitionConfig();\n\n  return (\n    <div className="flex items-center gap-4">\n      <label>Speed: {config.duration}s</label>\n      <input\n        type="range"\n        min="0.1"\n        max="2.0"\n        step="0.1"\n        value={config.duration}\n        onChange={(e) => setConfig({ duration: parseFloat(e.target.value) })}\n      />\n    </div>\n  );\n}`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← useGlide() Hook', href: '/docs/api/hooks/use-glide' }}
        next={{ label: 'useAnimationState() Hook →', href: '/docs/api/hooks/use-animation-state' }}
      />
    </div>
  );
}

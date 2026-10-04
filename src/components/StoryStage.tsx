import React from 'react';
import type { StoryScene, VisualBible, DiegeticType } from '../types/story';
import { BackgroundArt, ActionCGView } from '../services/visualService';
import { AtmosphereLayer } from './AtmosphereLayer';
import { ForeshadowItemView } from './ForeshadowItemView';
import { Smartphone, Disc, Terminal, Book } from 'lucide-react';
import { EnvironmentRenderer } from '../environment/EnvironmentRenderer.tsx';
import { CharacterRenderer } from '../character/CharacterRenderer.tsx';
import { PropRenderer } from '../effects/AtmosphereEffects.tsx';
import type { CanonicalFxId, CanonicalPropId, PropDefinition } from '../effects/types.ts';
import {
  getProductionSceneProps,
  getProductionSceneRequirement,
  getProductionSceneFx,
  getProductionScenePropPlacement,
} from '../scene/runtime/ProductionSceneRegistry.ts';
import { TransitionManager } from '../scene/transitions/TransitionManager.ts';

interface StoryStageProps {
  scene: StoryScene;
  particleType?: VisualBible['particleLanguage'];
  cameraTransform?: string;
  vignetteStyle?: string;
  reducedMotion: boolean;
  discoveredSecrets: string[];
  onDiscoverSecret: (secretId: string, flag: string) => void;
  onOpenDiegetic: () => void;
  isDiegeticRead: boolean;
}

export const StoryStage: React.FC<StoryStageProps> = ({
  scene,
  particleType = 'rain',
  cameraTransform = 'scale(1)',
  vignetteStyle,
  reducedMotion,
  discoveredSecrets,
  onDiscoverSecret,
  onOpenDiegetic,
  isDiegeticRead
}) => {
  const [hasEntered, setHasEntered] = React.useState(false);
  const isActionCG = Boolean(scene.actionCG);
  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHasEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const productionRequirement = React.useMemo(() => getProductionSceneRequirement(scene.id), [scene.id]);
  const productionProps = React.useMemo(() => getProductionSceneProps(scene.id), [scene.id]);
  const productionFx = React.useMemo(
    () => getProductionSceneFx(scene.id),
    [scene.id]
  );
  const productionEnvironment = productionRequirement?.environmentId;
  const sceneTransitionStyle = TransitionManager.getSceneStyle(hasEntered ? 'active' : 'entering', {
    type: scene.transition?.type || 'fade',
    duration: scene.transition?.duration || 250,
    easing: scene.transition?.easing,
    reducedMotion,
  });


  const getDiegeticIcon = (type: DiegeticType) => {
    switch (type) {
      case 'phone':
        return <Smartphone className="w-5 h-5 text-amber-300" />;
      case 'recorder':
        return <Disc className="w-5 h-5 text-red-400 animate-spin" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-cyan-300" />;
      case 'grimoire':
      default:
        return <Book className="w-5 h-5 text-purple-300" />;
    }
  };

  return (
    <div
      className="relative w-full h-full flex-1 min-h-[50vh] sm:min-h-[55vh] overflow-hidden select-none transition-transform duration-700 ease-out"
      style={{
        transform: reducedMotion ? 'none' : cameraTransform,
        willChange: 'transform',
        contain: 'layout paint',
      }}
    >
      <div className="absolute inset-0" style={sceneTransitionStyle}>
      {productionEnvironment ? (
        <EnvironmentRenderer
          environmentId={productionEnvironment}
          sceneId={scene.id}
          options={{ variantId: productionRequirement?.variantId, time: scene.location.time, weather: scene.location.weather }}
          reducedMotion={reducedMotion}
          className="!absolute inset-0 !min-h-0"
        >
          {productionProps.filter((p) => p.id !== 'prop_coffee').length > 0 && !isActionCG && (
            <div className="absolute inset-0 pointer-events-none z-[22]" data-scene-props={scene.id}>
              {productionProps
                .filter((p) => p.id !== 'prop_coffee')
                .map((prop, index) => {
                const placement = getProductionScenePropPlacement(
                  scene.id,
                  prop.id,
                  prop.anchor?.name,
                  index,
                  productionProps.length
                );
                return (
                  <PropRenderer
                    key={prop.id}
                    propId={prop.id as CanonicalPropId}
                    propDef={prop as unknown as PropDefinition}
                    position={placement}
                    scale={placement.scale ?? prop.scale}
                    responsiveToScene
                  />
                );
              })}
            </div>
          )}

          {!isActionCG && scene.characters.length > 0 && (
            <div className="absolute inset-0 pointer-events-none z-[30] overflow-hidden">
              {(() => {
                const visibleChars = scene.characters.slice(0, 2);
                const hasActiveSpeaker = Boolean(scene.speaker);

                return visibleChars.map((char, index) => {
                  const isCharSpeaker = hasActiveSpeaker
                    ? Boolean(
                        (char.name && scene.speaker && char.name.toLowerCase() === scene.speaker.toLowerCase()) ||
                        (char.id && scene.speaker && char.id.toLowerCase() === scene.speaker.toLowerCase()) ||
                        (char.characterId && scene.speaker && char.characterId.toLowerCase() === scene.speaker.toLowerCase())
                      )
                    : Boolean(char.isSpeaking);

                  const isDimmed = hasActiveSpeaker && !isCharSpeaker;

                  let defaultNormX: number;
                  let autoFlip = char.flipX;
                  if (visibleChars.length === 2) {
                    if (index === 0) {
                      defaultNormX = 0.22;
                      if (autoFlip === undefined) autoFlip = false;
                    } else {
                      defaultNormX = 0.78;
                      if (autoFlip === undefined) autoFlip = true;
                    }
                  } else {
                    if (char.position === 'left') {
                      defaultNormX = 0.22;
                      if (autoFlip === undefined) autoFlip = false;
                    } else if (char.position === 'right') {
                      defaultNormX = 0.78;
                      if (autoFlip === undefined) autoFlip = true;
                    } else {
                      defaultNormX = 0.5;
                    }
                  }

                  const normalizedPos = char.normalizedPosition ||
                    (char.customPosition
                      ? { x: char.customPosition.x / 1024, y: char.customPosition.y / 1536 }
                      : { x: defaultNormX, y: 1.0 });

                  return (
                    <CharacterRenderer
                      key={char.id}
                      characterId={char.characterId || char.id}
                      expression={char.expression}
                      pose={char.pose || 'standing_neutral'}
                      position={char.position}
                      normalizedPosition={normalizedPos}
                      scale={char.scale}
                      isSpeaking={isCharSpeaker}
                      isDimmed={isDimmed}
                      visible={char.visible !== false}
                      flipX={Boolean(autoFlip)}
                      zIndex={char.zIndex ?? (isCharSpeaker ? 32 : 30)}
                      reducedMotion={reducedMotion}
                    />
                  );
                });
              })()}
            </div>
          )}

          {isActionCG && scene.actionCG && (
            <div className="absolute inset-0 z-[30]">
              <ActionCGView cgId={scene.actionCG} />
            </div>
          )}

          {productionFx.map((fx) => {
            const id = fx.id as CanonicalFxId;
            const particleType = id === 'fx_rain_procedural' ? 'rain'
              : id === 'fx_fog_mist' ? 'fog'
                : id === 'fx_dust_motes' ? 'motes' : 'none';
            const isIndoor = scene.location.id.includes('cafe') ||
              scene.location.id.includes('room') ||
              scene.location.id.includes('office') ||
              scene.location.id.includes('apartment');
            const effectiveFxZIndex = (id === 'fx_rain_procedural' && isIndoor) ? 10 : fx.zIndex;
            return (
              <div key={id} className="absolute inset-0 pointer-events-none" style={{ zIndex: effectiveFxZIndex }} data-scene-fx={`${scene.id}:${id}`}>
                <AtmosphereLayer
                  weather="clear"
                  time={scene.location.time}
                  particleType={particleType}
                  activeFx={[id]}
                  activeFxOnly
                  particleMetricKey={`${scene.id}:${id}`}
                  reducedMotion={reducedMotion}
                />
              </div>
            );
          })}
        </EnvironmentRenderer>
      ) : (
        <>
          <div className="absolute inset-0 w-full h-full z-0">
            <BackgroundArt
              locationId={scene.location.id}
              time={scene.location.time}
              weather={scene.location.weather}
              mood={scene.location.mood}
              sceneId={scene.id}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none z-10">
            <AtmosphereLayer
              weather={scene.location.weather}
              time={scene.location.time}
              particleType={particleType}
              reducedMotion={reducedMotion}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none z-20" />
          {!isActionCG && scene.characters.length > 0 && (
            <div className="absolute inset-0 pointer-events-none z-[30] overflow-hidden">
              {(() => {
                const visibleChars = scene.characters.slice(0, 2);
                const hasActiveSpeaker = Boolean(scene.speaker);

                return visibleChars.map((char, index) => {
                  const isCharSpeaker = hasActiveSpeaker
                    ? Boolean(
                        (char.name && scene.speaker && char.name.toLowerCase() === scene.speaker.toLowerCase()) ||
                        (char.id && scene.speaker && char.id.toLowerCase() === scene.speaker.toLowerCase()) ||
                        (char.characterId && scene.speaker && char.characterId.toLowerCase() === scene.speaker.toLowerCase())
                      )
                    : Boolean(char.isSpeaking);

                  const isDimmed = hasActiveSpeaker && !isCharSpeaker;

                  let defaultNormX: number;
                  let autoFlip = char.flipX;
                  if (visibleChars.length === 2) {
                    if (index === 0) {
                      defaultNormX = 0.22;
                      if (autoFlip === undefined) autoFlip = false;
                    } else {
                      defaultNormX = 0.78;
                      if (autoFlip === undefined) autoFlip = true;
                    }
                  } else {
                    if (char.position === 'left') {
                      defaultNormX = 0.22;
                      if (autoFlip === undefined) autoFlip = false;
                    } else if (char.position === 'right') {
                      defaultNormX = 0.78;
                      if (autoFlip === undefined) autoFlip = true;
                    } else {
                      defaultNormX = 0.5;
                    }
                  }

                  const normalizedPos = char.normalizedPosition ||
                    (char.customPosition
                      ? { x: char.customPosition.x / 1024, y: char.customPosition.y / 1536 }
                      : { x: defaultNormX, y: 1.0 });

                  return (
                    <CharacterRenderer
                      key={char.id}
                      characterId={char.characterId || char.id}
                      expression={char.expression}
                      pose={char.pose || 'standing_neutral'}
                      position={char.position}
                      normalizedPosition={normalizedPos}
                      scale={char.scale}
                      isSpeaking={isCharSpeaker}
                      isDimmed={isDimmed}
                      visible={char.visible !== false}
                      flipX={Boolean(autoFlip)}
                      zIndex={char.zIndex ?? (isCharSpeaker ? 32 : 30)}
                      reducedMotion={reducedMotion}
                    />
                  );
                });
              })()}
            </div>
          )}
          {isActionCG && scene.actionCG && (
            <div className="absolute inset-0 z-30">
              <ActionCGView cgId={scene.actionCG} />
            </div>
          )}
        </>
      )}


      {/* Foreshadowing Discoverable Item (Props Layer: z-40) */}
      {scene.foreshadowItem && (
        <div className="relative z-40 pointer-events-auto">
          <ForeshadowItemView
            item={scene.foreshadowItem}
            isAlreadyDiscovered={discoveredSecrets.includes(scene.foreshadowItem.id)}
            onDiscover={() =>
              onDiscoverSecret(scene.foreshadowItem!.id, scene.foreshadowItem!.flagToUnlock)
            }
          />
        </div>
      )}

      {/* Dynamic Vignette from Theme Engine (Foreground FX: z-50) */}
      {vignetteStyle && (
        <div
          className="absolute inset-0 pointer-events-none z-50"
          style={{ background: vignetteStyle }}
        />
      )}

      {/* Cinematic Bottom Gradient for Dialogue blending (Foreground FX: z-50) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e111a] via-[#0e111a]/70 to-transparent pointer-events-none z-50" />

      {/* Diegetic In-World Item Trigger (UI Layer: z-100) */}
      {scene.diegeticItem && (
        <button
          onClick={onOpenDiegetic}
          aria-label={`Buka ${scene.diegeticItem.title}`}
          className="absolute top-16 left-5 z-[100] p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-300/60 backdrop-blur-md shadow-xl transition-all duration-300 active:scale-95 group flex items-center gap-2 pointer-events-auto"
        >
          <div className="relative">
            {getDiegeticIcon(scene.diegeticItem.type)}
            {!isDiegeticRead && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            )}
          </div>
          <span className="text-xs font-mono font-medium text-stone-200 hidden sm:inline-block pr-1">
            {scene.diegeticItem.title}
          </span>
        </button>
      )}
      </div>
    </div>
  );
};

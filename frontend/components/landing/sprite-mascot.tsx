"use client";

import React, { useEffect, useState, useRef } from "react";
import petConfig from "@/public/mascot/pet.json";

export type MascotPose = keyof typeof petConfig.spriteSheetConfig.sprites;

interface SpriteMascotProps {
  pose?: MascotPose;
  className?: string;
  size?: number; // width and height in pixels
  speed?: number; // speed multiplier (e.g. 1.0 = normal, 0.7 = slower, 1.5 = faster)
  fps?: number; // explicit FPS override
}

export function SpriteMascot({
  pose = "idle",
  className = "",
  size = 200,
  speed = 1.0,
  fps: customFps,
}: SpriteMascotProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const poseData = petConfig.spriteSheetConfig.sprites[pose] ?? petConfig.spriteSheetConfig.sprites.idle;
  const frameIndexRef = useRef(0);
  const frameCountRef = useRef(poseData.frameCount);

  // Atlas configuration from hatch-pet
  const ATLAS_COLS = 8;
  const CELL_WIDTH = 192;
  const CELL_HEIGHT = 208;

  useEffect(() => {
    // Reset animation when pose changes
    setCurrentFrame(0);
    frameIndexRef.current = 0;
    const currentPoseData = petConfig.spriteSheetConfig.sprites[pose] ?? petConfig.spriteSheetConfig.sprites.idle;
    frameCountRef.current = currentPoseData.frameCount;

    const baseFps = customFps ?? currentPoseData.fps ?? 6;
    const effectiveFps = Math.max(1, baseFps * speed);
    const isLooping = currentPoseData.loop;
    const intervalMs = 1000 / effectiveFps;

    const interval = setInterval(() => {
      frameIndexRef.current += 1;

      if (frameIndexRef.current >= frameCountRef.current) {
        if (isLooping) {
          frameIndexRef.current = 0;
        } else {
          frameIndexRef.current = frameCountRef.current - 1; // hold on last frame
        }
      }

      setCurrentFrame(frameIndexRef.current);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [pose, speed, customFps]);

  // Calculate absolute frame index in the atlas
  const absoluteFrame = poseData.startFrame + currentFrame;

  // Calculate X and Y on the atlas
  const xCol = absoluteFrame % ATLAS_COLS;
  const yRow = Math.floor(absoluteFrame / ATLAS_COLS);

  // Background position percentages
  // If cols=8, there are 7 "steps" from 0% to 100%. So x% = (col / (cols - 1)) * 100
  const xPercent = ATLAS_COLS > 1 ? (xCol / (ATLAS_COLS - 1)) * 100 : 0;
  const yPercent = (1872 / 208) > 1 ? (yRow / ((1872 / 208) - 1)) * 100 : 0;

  return (
    <div
      className={`relative inline-block select-none pointer-events-auto ${className}`}
      style={{
        width: size,
        height: size * (CELL_HEIGHT / CELL_WIDTH),
      }}
    >
      <div
        className="w-full h-full bg-no-repeat"
        style={{
          backgroundImage: `url(${petConfig.spritesheetPath})`,
          backgroundPosition: `${xPercent}% ${yPercent}%`,
          backgroundSize: `${ATLAS_COLS * 100}% auto`,
        }}
      />
    </div>
  );
}

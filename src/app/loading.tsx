"use client";
import styled, { keyframes } from "styled-components";

interface WaveLetterProps {
  delay: number;
}

// wave animation
const waveAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const WaveLetter = styled.p<WaveLetterProps>`
  animation: ${waveAnimation} 1s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

export default function Loading() {
  const dotCount = 5;
  const dots = Array.from({ length: dotCount }, () => ".");

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-1">
        {dots.map((dot, index) => (
          <WaveLetter
            key={index}
            delay={index * 0.1}
            className="text-md font-medium text-gray-400"
          >
            {dot}
          </WaveLetter>
        ))}
      </div>
    </div>
  );
}

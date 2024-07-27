import React, { ReactNode } from 'react';
import Image from 'next/image';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;  // ここに onClick プロパティを追加
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => (
  <div className={`card ${className}`} onClick={onClick}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={`card-header ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={`card-content ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h2 className={`card-title ${className}`}>
    {children}
  </h2>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
  <p className={`card-description ${className}`}>
    {children}
  </p>
);

export const CardImage: React.FC<CardImageProps> = ({ src, alt }) => (
  <Image src={src} alt={alt} layout="fill" objectFit="cover" />
);

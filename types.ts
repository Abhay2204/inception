export interface ScrollProps {
  scrollY: any; // Using any for MotionValue to avoid strict type complexity in this snippet
  scrollYProgress: any;
}

export interface LayerProps {
  id?: string;
  className?: string;
}
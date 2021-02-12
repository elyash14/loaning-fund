import { NextComponentType, NextPage } from 'next';
import type { AppProps  } from 'next/app'

export type ProjectPage<T> = NextPage<T> & {
    privatePage?: boolean;
    layout?: string;
  };
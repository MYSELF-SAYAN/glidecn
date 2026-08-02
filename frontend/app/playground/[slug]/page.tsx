import { redirect } from 'next/navigation';

export default function PlaygroundSlugFallback() {
  redirect('/playground/page-1');
}

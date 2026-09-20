import { AboutPreview } from "@/components/home/AboutPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { Statement } from "@/components/home/Statement";

/**
 * Homepage — composition only. Each section is an independent, reusable
 * component so sections can be re-ordered or reused without touching
 * one another.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <SolutionsPreview />
      <SelectedWork />
      <Process />
      <AboutPreview />
      <FinalCta />
    </>
  );
}

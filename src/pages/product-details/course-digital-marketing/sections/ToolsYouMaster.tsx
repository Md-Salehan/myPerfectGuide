// ============================================================
// src/pages/product-details/course-digital-marketing/sections/ToolsYouMaster.tsx
// ============================================================
import { ToolsYouMaster as ToolsYouMasterBase, type Tool } from "../../../../components/product/sections";

const tools: Tool[] = [
  { name: "Google Adsm",          src: `${import.meta.env.BASE_URL}images/tools/Google Ads.svg` },
  { name: "Google Adsm",          src: `${import.meta.env.BASE_URL}images/tools/Google Ads.svg` },
  { name: "Google Adsm",          src: `${import.meta.env.BASE_URL}images/tools/Google Ads.svg` },
      
];

export function ToolsYouMaster() {


  return <ToolsYouMasterBase
      heading="Tools You'll Master"
      subtitle="25+ tools you'll actually use on the job — practiced hands-on, not shown in a screenshot walkthrough."
      tools={tools}
    />
}
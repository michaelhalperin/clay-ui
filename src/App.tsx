import { useState, useEffect } from "react";
import { ButtonsShowcase } from "./components/ui/Buttons";
import { TogglesShowcase } from "./components/ui/Toggles";
import { InputsShowcase } from "./components/ui/Inputs";
import { SlidersShowcase } from "./components/ui/Sliders";
import { ModalShowcase } from "./components/ui/Modal";
import { ToastShowcase, ToastProvider } from "./components/ui/Toast";
import { CommandPaletteShowcase } from "./components/ui/CommandPalette";
import { DropdownShowcase } from "./components/ui/Dropdown";
import { SkeletonShowcase } from "./components/ui/Skeleton";
import { DatePickerShowcase } from "./components/ui/DatePicker";
import { TooltipShowcase } from "./components/ui/Tooltip";
import { AccordionShowcase } from "./components/ui/Accordion";
import { AlertShowcase } from "./components/ui/Alert";
import { BadgeShowcase } from "./components/ui/Badge";
import { ProgressShowcase } from "./components/ui/Progress";
import { CheckboxRadioShowcase } from "./components/ui/CheckboxRadio";
import { OTPShowcase } from "./components/ui/OTPInput";
import { TagInputShowcase } from "./components/ui/TagInput";
import { PopoverShowcase } from "./components/ui/Popover";
import { ContextMenuShowcase } from "./components/ui/ContextMenu";
import { FileDropzoneShowcase } from "./components/ui/FileDropzone";
import { StepperShowcase } from "./components/ui/Stepper";
import { ColorPickerShowcase } from "./components/ui/ColorPicker";
import { RatingShowcase } from "./components/ui/Rating";
import { PaginationShowcase } from "./components/ui/Pagination";
import { ChatShowcase } from "./components/ui/Chat";
import { CodeBlockShowcase } from "./components/ui/CodeBlock";
import { CarouselShowcase } from "./components/ui/Carousel";
import { TreeViewShowcase } from "./components/ui/TreeView";
import { NumberInputShowcase } from "./components/ui/NumberInput";
import { SortableListShowcase } from "./components/ui/SortableList";
import { RichTextEditorShowcase } from "./components/ui/RichTextEditor";
import { PhoneInputShowcase } from "./components/ui/PhoneInput";
import { ImageGalleryShowcase } from "./components/ui/ImageGallery";
import { BreadcrumbShowcase } from "./components/ui/Breadcrumb";
import { ResizablePanelShowcase } from "./components/ui/ResizablePanel";
import { KeyboardShortcutsShowcase } from "./components/ui/KeyboardShortcuts";
import { ComboboxShowcase } from "./components/ui/Combobox";
import { TimePickerShowcase } from "./components/ui/TimePicker";
import { MentionInputShowcase } from "./components/ui/MentionInput";
import { SignaturePadShowcase } from "./components/ui/SignaturePad";
import { TourShowcase } from "./components/ui/Tour";
import { GaugeShowcase } from "./components/data/Gauge";
import { FullCalendarShowcase } from "./components/data/FullCalendar";
import { NotificationCenterShowcase } from "./components/data/NotificationCenter";
import { SparklineShowcase } from "./components/data/Sparkline";
import { DataGridShowcase } from "./components/data/DataGrid";
import { StatCardsShowcase } from "./components/data/StatCards";
import { ChartsShowcase } from "./components/data/Charts";
import { TableShowcase } from "./components/data/Table";
import { KanbanShowcase } from "./components/data/Kanban";
import { TimelineShowcase } from "./components/data/Timeline";
import { EmptyStatesShowcase } from "./components/data/EmptyStates";
import { AvatarShowcase } from "./components/data/Avatar";
import { HeatmapShowcase } from "./components/data/Heatmap";
import { NavbarShowcase } from "./components/nav/Navbar";
import { TabsShowcase } from "./components/nav/Tabs";
import { DrawerShowcase } from "./components/nav/Drawer";
import { CardsShowcase } from "./components/cards/Cards";
import { SectionDocLink } from "./components/DocLink";
import { getDocUrl } from "./lib/docs";

interface Section {
  id: string;
  label: string;
  category: string;
  isNew?: boolean;
  component: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "buttons",
    label: "Buttons",
    category: "UI Elements",
    component: <ButtonsShowcase />,
  },
  {
    id: "toggles",
    label: "Toggles",
    category: "UI Elements",
    component: <TogglesShowcase />,
  },
  {
    id: "inputs",
    label: "Inputs",
    category: "UI Elements",
    component: <InputsShowcase />,
  },
  {
    id: "sliders",
    label: "Sliders",
    category: "UI Elements",
    component: <SlidersShowcase />,
  },
  {
    id: "dropdown",
    label: "Dropdown / Select",
    category: "UI Elements",
    component: <DropdownShowcase />,
  },
  {
    id: "modal",
    label: "Modal / Dialog",
    category: "UI Elements",
    component: <ModalShowcase />,
  },
  {
    id: "toast",
    label: "Toast",
    category: "UI Elements",
    component: <ToastShowcase />,
  },
  {
    id: "command",
    label: "Command Palette",
    category: "UI Elements",
    component: <CommandPaletteShowcase />,
  },
  {
    id: "skeleton",
    label: "Skeleton Loaders",
    category: "UI Elements",
    component: <SkeletonShowcase />,
  },
  {
    id: "datepicker",
    label: "Date Picker",
    category: "UI Elements",
    component: <DatePickerShowcase />,
  },
  {
    id: "tooltip",
    label: "Tooltip",
    category: "UI Elements",
    component: <TooltipShowcase />,
  },
  {
    id: "accordion",
    label: "Accordion",
    category: "UI Elements",
    component: <AccordionShowcase />,
  },
  {
    id: "alert",
    label: "Alert / Banner",
    category: "UI Elements",
    component: <AlertShowcase />,
  },
  {
    id: "badge",
    label: "Badge / Tag",
    category: "UI Elements",
    component: <BadgeShowcase />,
  },
  {
    id: "progress",
    label: "Progress",
    category: "UI Elements",
    component: <ProgressShowcase />,
  },
  {
    id: "checkboxradio",
    label: "Checkbox & Radio",
    category: "UI Elements",
    component: <CheckboxRadioShowcase />,
  },
  {
    id: "otp",
    label: "OTP Input",
    category: "UI Elements",
    component: <OTPShowcase />,
  },
  {
    id: "taginput",
    label: "Tag Input",
    category: "UI Elements",
    component: <TagInputShowcase />,
  },
  {
    id: "popover",
    label: "Popover",
    category: "UI Elements",
    component: <PopoverShowcase />,
  },
  {
    id: "contextmenu",
    label: "Context Menu",
    category: "UI Elements",
    component: <ContextMenuShowcase />,
  },
  {
    id: "filedropzone",
    label: "File Dropzone",
    category: "UI Elements",
    component: <FileDropzoneShowcase />,
  },
  {
    id: "stepper",
    label: "Stepper / Wizard",
    category: "UI Elements",
    component: <StepperShowcase />,
  },
  {
    id: "colorpicker",
    label: "Color Picker",
    category: "UI Elements",
    component: <ColorPickerShowcase />,
  },
  {
    id: "rating",
    label: "Rating",
    category: "UI Elements",
    component: <RatingShowcase />,
  },
  {
    id: "pagination",
    label: "Pagination",
    category: "UI Elements",
    component: <PaginationShowcase />,
  },
  {
    id: "chat",
    label: "Chat / Messages",
    category: "UI Elements",
    component: <ChatShowcase />,
  },
  {
    id: "codeblock",
    label: "Code Block",
    category: "UI Elements",
    component: <CodeBlockShowcase />,
  },
  {
    id: "carousel",
    label: "Carousel",
    category: "UI Elements",
    component: <CarouselShowcase />,
  },
  {
    id: "treeview",
    label: "Tree View",
    category: "UI Elements",
    component: <TreeViewShowcase />,
  },
  {
    id: "numberinput",
    label: "Number Input",
    category: "UI Elements",
    component: <NumberInputShowcase />,
  },
  {
    id: "sortablelist",
    label: "Sortable List",
    category: "UI Elements",
    component: <SortableListShowcase />,
  },
  {
    id: "richtexteditor",
    label: "Rich Text Editor",
    category: "UI Elements",
    component: <RichTextEditorShowcase />,
  },
  {
    id: "phoneinput",
    label: "Phone Input",
    category: "UI Elements",
    component: <PhoneInputShowcase />,
  },
  {
    id: "imagegallery",
    label: "Image Gallery",
    category: "UI Elements",
    component: <ImageGalleryShowcase />,
  },
  {
    id: "breadcrumb",
    label: "Breadcrumb",
    category: "UI Elements",
    component: <BreadcrumbShowcase />,
  },
  {
    id: "resizablepanel",
    label: "Resizable Panel",
    category: "UI Elements",
    component: <ResizablePanelShowcase />,
  },
  {
    id: "keyboardshortcuts",
    label: "Keyboard Shortcuts",
    category: "UI Elements",
    component: <KeyboardShortcutsShowcase />,
  },
  {
    id: "combobox",
    label: "Combobox",
    category: "UI Elements",
    component: <ComboboxShowcase />,
    isNew: true,
  },
  {
    id: "timepicker",
    label: "Time Picker",
    category: "UI Elements",
    component: <TimePickerShowcase />,
    isNew: true,
  },
  {
    id: "mentioninput",
    label: "Mention Input",
    category: "UI Elements",
    component: <MentionInputShowcase />,
    isNew: true,
  },
  {
    id: "signaturepad",
    label: "Signature Pad",
    category: "UI Elements",
    component: <SignaturePadShowcase />,
    isNew: true,
  },
  {
    id: "tour",
    label: "Tour / Spotlight",
    category: "UI Elements",
    component: <TourShowcase />,
    isNew: true,
  },
  {
    id: "gauge",
    label: "Gauge / Meter",
    category: "Data",
    component: <GaugeShowcase />,
  },
  {
    id: "fullcalendar",
    label: "Full Calendar",
    category: "Data",
    component: <FullCalendarShowcase />,
  },
  {
    id: "notificationcenter",
    label: "Notification Center",
    category: "Data",
    component: <NotificationCenterShowcase />,
  },
  {
    id: "sparkline",
    label: "Sparkline",
    category: "Data",
    component: <SparklineShowcase />,
    isNew: true,
  },
  {
    id: "datagrid",
    label: "Data Grid",
    category: "Data",
    component: <DataGridShowcase />,
    isNew: true,
  },
  {
    id: "stats",
    label: "Stat Cards",
    category: "Data",
    component: <StatCardsShowcase />,
  },
  {
    id: "charts",
    label: "Charts",
    category: "Data",
    component: <ChartsShowcase />,
  },
  {
    id: "table",
    label: "Table",
    category: "Data",
    component: <TableShowcase />,
  },
  {
    id: "kanban",
    label: "Kanban Board",
    category: "Data",
    component: <KanbanShowcase />,
  },
  {
    id: "timeline",
    label: "Timeline",
    category: "Data",
    component: <TimelineShowcase />,
  },
  {
    id: "emptystates",
    label: "Empty States",
    category: "Data",
    component: <EmptyStatesShowcase />,
  },
  {
    id: "avatar",
    label: "Avatar / Group",
    category: "Data",
    component: <AvatarShowcase />,
  },
  {
    id: "heatmap",
    label: "Heatmap",
    category: "Data",
    component: <HeatmapShowcase />,
  },
  {
    id: "navbar",
    label: "Navbar",
    category: "Navigation",
    component: <NavbarShowcase />,
  },
  {
    id: "tabs",
    label: "Tabs",
    category: "Navigation",
    component: <TabsShowcase />,
  },
  {
    id: "drawer",
    label: "Drawer",
    category: "Navigation",
    component: <DrawerShowcase />,
  },
  {
    id: "cards",
    label: "Cards",
    category: "Cards",
    component: <CardsShowcase />,
  },
];

const categories = Array.from(new Set(sections.map((s) => s.category)));

const catMeta: Record<string, { color: string; dot: string }> = {
  "UI Elements": { color: "text-sky-600", dot: "bg-sky-400" },
  Data: { color: "text-violet-600", dot: "bg-violet-400" },
  Navigation: { color: "text-emerald-600", dot: "bg-emerald-400" },
  Cards: { color: "text-pink-600", dot: "bg-pink-400" },
};

const catBadge: Record<string, string> = {
  "UI Elements": "bg-sky-100 text-sky-600",
  Data: "bg-violet-100 text-violet-600",
  Navigation: "bg-emerald-100 text-emerald-600",
  Cards: "bg-pink-100 text-pink-600",
};

export default function App() {
  const [activeId, setActiveId] = useState(sections[0].id);

  // Highlight sidebar link on scroll
  useEffect(() => {
    const handler = () => {
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 font-body flex">
        {/* ── Sidebar ── */}
        <aside className="w-56 shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-slate-100 bg-white flex flex-col">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-slate-100 flex items-center gap-2.5">
            <div className="w-7 h-7 bg-sky-500 rounded-xl flex items-center justify-center shadow-clay shrink-0">
              <span className="text-white text-[11px] font-heading font-bold">
                C
              </span>
            </div>
            <span className="font-heading font-bold text-slate-800 flex-1">
              Clay UI
            </span>
            <a
              href={getDocUrl("/")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-wide text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-lg transition-colors shrink-0"
            >
              Docs
            </a>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
            {categories.map((cat) => {
              const meta = catMeta[cat];
              const items = sections.filter((s) => s.category === cat);
              return (
                <div key={cat}>
                  <div
                    className={`flex items-center gap-1.5 px-2 mb-1 ${meta.color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {cat}
                    </span>
                  </div>
                  {items.map((s) => (
                    <div key={s.id} className="flex items-center gap-0.5">
                      <button
                        onClick={() => scrollTo(s.id)}
                        className={`flex-1 min-w-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer transition-all duration-150 text-left
                          ${
                            activeId === s.id
                              ? "bg-sky-50 text-sky-700 font-semibold"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          }`}
                      >
                        <span className="flex-1 truncate">{s.label}</span>
                        {s.isNew && (
                          <span className="text-[9px] font-bold bg-sky-500 text-white px-1.5 py-0.5 rounded-full leading-none shrink-0">
                            NEW
                          </span>
                        )}
                      </button>
                      <SectionDocLink sectionId={s.id} label={s.label} compact />
                    </div>
                  ))}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="px-8 py-10 space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-8">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${catBadge[section.category]}`}
                  >
                    {section.category}
                  </span>
                  <h2 className="font-heading font-bold text-slate-800 text-lg">
                    {section.label}
                  </h2>
                  {section.isNew && (
                    <span className="text-[10px] font-bold bg-gradient-to-r from-sky-500 to-violet-500 text-white px-2 py-0.5 rounded-full shadow-soft shrink-0">
                      NEW
                    </span>
                  )}
                  <SectionDocLink sectionId={section.id} label={section.label} />
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Component demo */}
                <div className="bg-white rounded-clay-lg border border-slate-100 shadow-soft p-6">
                  {section.component}
                </div>
              </section>
            ))}

            <p className="pb-10 text-center text-xs text-slate-200">
              Clay UI Sandbox · React + TypeScript + Tailwind + Recharts
            </p>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}

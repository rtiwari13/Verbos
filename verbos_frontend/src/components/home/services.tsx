import { Button } from "@/components/ui/button";
import notes_image from "@/assets/home_page_images/notes.png";
import document_image from "@/assets/home_page_images/document_image.png";
import task_image from "@/assets/home_page_images/task_image.png";

export default function Services() {
  const sections = [
    {
      title: "A modern way to document",
      description:
        "With a clean & intuitive interface of Verbos you can focus on writing. It's not just an editor, it's your space to create, where every word works for you.",
      button: "Check Out Documents",
      img: document_image,
      url: "/document",
    },
    {
      title: "Notes made simple for all your ideas",
      description:
        "Organize your life, projects, and capture ideas with flexible Verbos notebook. It's more than a notebook—it's your digital brain.",
      button: "Discover Note Taking",
      img: notes_image,
      url: "/notebook",
    },

    {
      title: "Better task management for every challenge",
      description:
        "Stop feeling overwhelmed and start finding clarity. Turn your goals into reality. Verbos task manager gives you the tools to succeed.",
      button: "Go to Task Manager",
      img: task_image,
      url: "/task-manager",
    },
  ];

  return (
    <div className="flex flex-col gap-12 p-8">
      {sections.map((sec, i) => (
        <div
          key={i}
          className={`flex flex-col ${
            i == 1 ? "md:flex-row-reverse" : "md:flex-row"
          }  items-center gap-8 p-8 rounded-2xl border bg-card text-card-foreground shadow-sm`}
        >
          {/* Image */}
          <div className="w-full md:w-5/12">
            <img
              src={sec.img.src}
              alt={sec.title}
              className="w-[480px] h-auto rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 flex-1">
            <h2 className="text-3xl font-bold tracking-tight">{sec.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {sec.description}
            </p>
            <a href={sec.url}>
              <Button
              size="lg"
              className="bg-transparent border-2 border-primary text-foreground rounded-full hover:cursor-pointer "
            >
              {sec.button}
            </Button>
            </a>
            
          </div>
        </div>
      ))}
    </div>
  );
}

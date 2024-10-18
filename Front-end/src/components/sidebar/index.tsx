"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import Image from "next/image";
import logoCompany from "@/assets/simbolo-de-medicina.png";
import {
  FaBars,
  FaHouse,
  FaUserGear,
  FaGears,
  FaPowerOff,
} from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-14 border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-6 px-2 py-5">
          <TooltipProvider>
            <Link
              href={"/home"}
              className="flex border-2 h-10 w-10 rounded-xl hover:bg-muted text-lg items-center justify-center  md:text-base"
            >
              <Image
                src={logoCompany}
                alt="Logo e menu principal"
                width={20}
                height={20}
              />
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/home"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaHouse className="h-5 w-5 transition-all " />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Página inicial</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaUserGear className="h-5 w-5 transition-all " />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Seu perfil</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/settings"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaGears className="h-5 w-5 transition-all " />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleLogout}>
                  <FaPowerOff className="h-5 w-5 transition-all " />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header>
          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant={"outline"} className="sm:hidden">
                <FaBars />
                <p className="sr-only">Abrir</p>
              </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-normal">
                <Link
                  href={"/home"}
                  className="flex border-2 h-10 w-10 rounded-xl  hover:bg-muted text-lg items-center justify-center"
                >
                  <Image
                    src={logoCompany}
                    alt="Logo e menu principal"
                    width={25}
                    height={25}
                  />
                </Link>
                <Link
                  href={"/home"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaHouse className="h-5 w-5 transition-all " />
                  Página inicial
                </Link>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaUserGear className="h-5 w-5 transition-all " />
                  Perfil
                </Link>
                <Link
                  href={"/settings"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaGears className="h-5 w-5 transition-all " />
                  Configurações
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;

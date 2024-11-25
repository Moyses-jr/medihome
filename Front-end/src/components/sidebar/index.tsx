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
import { useLogin } from "@/context/loginContext";

const Sidebar = () => {
  const { logout } = useLogin();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/home"}
                  className="flex border-2 h-10 w-10 rounded-xl hover:bg-muted items-center justify-center gap-4 md:text-base"
                >
                  <Image
                    src={logoCompany}
                    alt="Logo e menu principal"
                    width={20}
                    height={20}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                className="bg-red-200 px-3 py-2 rounded-xl bg-opacity-90"
                side="right"
              >
                MediHome
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/home"}
                  className="flex items-center gap-4 px-2.5  hover:text-muted-foreground"
                >
                  <FaHouse className="h-5 w-5 transition-all " />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                className="bg-red-200 px-3 py-2 rounded-xl bg-opacity-90"
                side="right"
              >
                Página inicial
              </TooltipContent>
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
              <TooltipContent
                className="bg-red-200 px-3 py-2 rounded-xl bg-opacity-90"
                side="right"
              >
                Seu perfil
              </TooltipContent>
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
              <TooltipContent
                className="bg-red-200 px-3 py-2 rounded-xl bg-opacity-90"
                side="right"
              >
                Configurações
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-2.5 hover:text-muted-foreground text-red-600"
                >
                  <FaPowerOff className="h-5 w-5 transition-all " />
                </button>
              </TooltipTrigger>
              <TooltipContent
                className="bg-red-300 px-3 py-2 rounded-xl bg-opacity-90"
                side="right"
              >
                Sair
              </TooltipContent>
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
                  className="flex border-2 h-10 w-10 rounded-xl  gap-4 pl-1.5 hover:bg-muted text-lg items-center "
                >
                  <Image
                    src={logoCompany}
                    alt="Logo e menu principal"
                    width={25}
                    height={25}
                  />
                  Medihome
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
              <nav className="mt-auto items-center gap-4 px-2 pt-[425px]">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-2.5 hover:text-muted-foreground text-red-600"
                >
                  <FaPowerOff className="h-5 w-5 transition-all " />
                  Sair
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;

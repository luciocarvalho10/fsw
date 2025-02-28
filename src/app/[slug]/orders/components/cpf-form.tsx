"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, "CPF é obrigatório")
    .refine(isValidCpf, "CPF inválido"),
});

type FormSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = ({ cpf }: FormSchema) =>
    router.push(`${pathname}?cpf=${removeCpfPunctuation(cpf)}`);
    // router.replace(`${pathname}?cpf=${removeCpfPunctuation(cpf)}`);

  const handlecancel = () => router.back();

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira seua CPF abaixo para visualizar os seus pedidos.
          </DrawerDescription>
        </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format={"###.###.###-##"}
                        placeholder="Digite seu CPF"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                >
                  Enviar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="rounded-full" onClick={handlecancel}>
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;

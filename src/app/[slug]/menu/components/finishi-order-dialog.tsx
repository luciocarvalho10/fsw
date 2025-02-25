"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { isValidCpf } from "../helpers/cpf"

const formSchema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório"),
    cpf: z.string().trim().min(1, "CPF é obrigatório").refine(isValidCpf, "CPF inválido")
})

type FormSchema = z.infer<typeof formSchema>

const onSubmit = (values: FormSchema) => {
    console.log(values)
}

interface FinishiOrderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const FinishiOrderDialog = ({ open, onOpenChange }: FinishiOrderDialogProps) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        shouldUnregister: true,
        defaultValues: {
            name: "",
            cpf: ""
        }
    })
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat format={"###.###.###-##"} placeholder="Digite seu CPF" customInput={Input} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button type="submit" variant="destructive" className="rounded-full">Enviar</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="rounded-full">Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>

    )
}

export default FinishiOrderDialog
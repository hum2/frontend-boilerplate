"use client";

import { useEffect, useState } from "react";
import { Alert, Badge, Card, Checkbox, Dialog, Input, Popover, Select, Textarea } from "@/components/atoms";
import { Button } from "@/components/atoms/Button/Button";
import { Todo } from "@/domain/todo/todo";
import { useDI } from "@/di/provider";

export default function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { todoRepository } = useDI();
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const data = await todoRepository.fetchTodos();
                setTodos(data);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        };

        getTodos();
    }, []);

    const onClick = () => {
        setIsDialogOpen(true);
    };

    return (
        <>
            <Card className="mx-4 mb-4">
                <h2 className="text-xl my-4 my-2">
                    Dialog
                </h2>
                <Button label="Click me" onClick={onClick} />
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    title="Dialog Title"
                    description="This is a dialog description."
                    className="w-1/2"
                >
                    <p>This is the dialog content.</p>
                </Dialog>
            </Card>

            <Card className="mx-4 mb-4">
                <h2 className="text-xl my-4 my-2">
                    Alert
                </h2>
                <Alert className="text-sm text-gray-500">
                    Click the button to see an alert.
                </Alert>
            </Card>

            <Card className="mx-4 mb-4">
                <h2 className="text-xl my-4 my-2">
                    Form
                </h2>
                <form className="flex flex-col">
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        className="mb-4"
                    />
                    <Select
                        options={[
                            { value: "option1", label: "Option 1" },
                            { value: "option2", label: "Option 2" },
                            { value: "option3", label: "Option 3" },
                        ]}
                        className="mb-4"
                    />
                    <Checkbox
                        label="I agree to the terms and conditions"
                        className="mb-4"
                    />
                    <Textarea
                        placeholder="Enter your message"
                        className="mb-4"
                    />
                    <Button label="Submit" onClick={() => { alert('Submit!') }} />
                </form>
            </Card>

            <Card className="mx-4 mb-4">
                <h2 className="text-xl my-4 my-2">
                    TODO List
                </h2>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id} className="mb-2">
                            <h2 className="text-xl font-semibold">{todo.title}</h2>
                            <p>{todo.body}</p>
                        </li>
                    ))}
                </ul>
            </Card>
        </>
    );
}

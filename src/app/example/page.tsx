"use client";

import React, { useState } from "react";
import {
    Alert,
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    Dialog,
    DropdownMenu,
    Input,
    Popover,
    Select,
    Switch,
    Table,
    Tabs,
    Textarea,
    Tooltip,
} from "@/components/atoms";
import Link from "next/link";

export default function ExampleAtomsPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    return (
        <div className="max-w-2xl mx-auto py-8 space-y-8">
            <h1 className="text-2xl font-bold mb-6">Atomsコンポーネント サンプル一覧</h1>

            <Link href="/">
                <Button label="Homeへ" />
            </Link>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Button</h2>
                <Button label="Primary Button" onClick={() => alert("Clicked!")} />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Input</h2>
                <Input
                    type="text"
                    placeholder="テキストを入力"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Select</h2>
                <Select
                    options={[
                        { value: "option1", label: "Option 1" },
                        { value: "option2", label: "Option 2" },
                    ]}
                    value={selectValue}
                    onChange={v => setSelectValue(v as string)}
                />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Checkbox</h2>
                <Checkbox
                    label="チェックボックス"
                    checked={checked}
                    onCheckedChange={setChecked}
                />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Switch</h2>
                <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Textarea</h2>
                <Textarea
                    placeholder="複数行テキスト"
                    value={textareaValue}
                    onChange={e => setTextareaValue(e.target.value)}
                />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Alert</h2>
                <Alert>これはAlertのサンプルです。</Alert>
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Badge</h2>
                <Badge>New</Badge>
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Avatar</h2>
                <Avatar src="https://placehold.jp/40x40.png" alt="avatar" />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Dialog</h2>
                <Button label="ダイアログを開く" onClick={() => setDialogOpen(true)} />
                <Dialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    title="Dialogタイトル"
                    description="Dialogの説明文です。"
                >
                    <p>Dialogの中身です。</p>
                </Dialog>
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Tabs</h2>
                <Tabs
                    items={[
                        { value: "tab1", label: "Tab1", content: <div>タブ1の内容</div> },
                        { value: "tab2", label: "Tab2", content: <div>タブ2の内容</div> },
                    ]}
                />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Table</h2>
                <Table
                    columns={[
                        { header: "名前", accessor: "name" },
                        { header: "年齢", accessor: "age" },
                    ]}
                    data={[
                        { name: "Taro", age: 20 },
                        { name: "Hanako", age: 22 },
                    ]}
                />
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Tooltip</h2>
                <Tooltip content="ツールチップの内容">
                    <span className="underline cursor-help">ホバーしてね</span>
                </Tooltip>
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">Popover</h2>
                <Popover trigger={<Button label="Popoverを開く" />}>
                    <div className="p-2">Popoverの内容</div>
                </Popover>
            </Card>

            <Card className="p-4">
                <h2 className="font-semibold mb-2">DropdownMenu</h2>
                <DropdownMenu
                    trigger={<Button label="メニューを開く" />}
                    items={[
                        { label: "メニュー1", onClick: () => alert("メニュー1") },
                        { label: "メニュー2", onClick: () => alert("メニュー2") },
                    ]}
                />
            </Card>
        </div>
    );
}

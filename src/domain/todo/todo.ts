export interface TodoProps {
    id: number;
    title: string;
    body: string;
}

export type TodoId = number;

export class Todo {
    private readonly props: TodoProps;

    constructor(props: TodoProps) {
        this.validateTitle(props.title);
        this.validateBody(props.body);
        this.props = props;
    }

    get id(): TodoId {
        return this.props.id;
    }

    get title(): string {
        return this.props.title;
    }

    get body(): string {
        return this.props.body;
    }

    // タイトルをバリデーション
    private validateTitle(title: string): void {
        if (!title) {
            throw new Error('Title is required');
        }
        if (title.length > 100) {
            throw new Error('Title must be less than 100 characters');
        }
    }

    // 本文をバリデーション
    private validateBody(body: string): void {
        if (!body) {
            throw new Error('Body is required');
        }
        if (body.length > 500) {
            throw new Error('Body must be less than 500 characters');
        }
    }
}

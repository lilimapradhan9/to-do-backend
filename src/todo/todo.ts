import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

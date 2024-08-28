import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  episode_id: string;

  @Prop()
  opening_crawl: string;

  @Prop()
  director: string;

  @Prop()
  producer: string;

  @Prop()
  release_date: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

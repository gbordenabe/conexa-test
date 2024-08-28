import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  episode_id: string;

  @Prop()
  opening_crawl: string;

  @Prop()
  director: string;

  @Prop()
  producer: string;

  @Prop()
  release_date: string;

  @Prop()
  characters: string[];

  @Prop()
  planets: string[];

  @Prop()
  starships: string[];

  @Prop()
  vehicles: string[];

  @Prop()
  species: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

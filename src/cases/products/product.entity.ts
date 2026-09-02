import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { ManyToOne } from "typeorm/browser";
import { JoinColumn } from "typeorm/browser";

@Entity('')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text', nullable: true })
  picture?: string;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category | null;
}

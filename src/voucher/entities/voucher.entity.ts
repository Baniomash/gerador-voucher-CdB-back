import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 18, unique: true})
    voucherCode: string;

    @Column({ type: 'varchar', length: 12, nullable: true})
    clientCpf: string;
}

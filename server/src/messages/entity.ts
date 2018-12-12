import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne } from 'typeorm'
  import { IsString} from 'class-validator'
  import Project from '../projects/entity'
  import User from '../users/entity'
  
  @Entity()
  export default class Message extends BaseEntity {
  
    @PrimaryGeneratedColumn()
    id?: number
  
    @IsString()
    @Column('text', {nullable:false})
    content: string
  
    @Column('timestamp', {default: () => "CURRENT_TIMESTAMP"})
    time: Date
   
    @ManyToOne(_ => User, user => user.messages, {eager:true})
    user: User
  
    @ManyToOne(_ => Project, project => project.messages)
    project: Project
  }
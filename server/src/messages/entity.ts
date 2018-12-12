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
  
    @Column('text', {nullable:true})
    picture: string
  
    @IsString()
    @Column('text', {nullable:false})
    content: string
  
    @Column('timestamp', {nullable:false})
    time: string
   
    @ManyToOne(_ => User, user => user.messages)
    user: User
  
    @ManyToOne(_ => Project, project => project.messages)
    project: Project
  }
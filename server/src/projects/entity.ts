import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany} from 'typeorm'
  import Message from '../messages/entity'
  
  @Entity()
  export default class Project extends BaseEntity {
  
    @PrimaryGeneratedColumn()
    id?: number
  
    @Column('text', {nullable:true})
    name: string
    
    @OneToMany(_ => Message, message => message.project)
    messages: Message[]
  
  }
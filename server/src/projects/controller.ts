import {
    JsonController,
    Get,
    Post,
    // Put,
    Body,
    Param,
    Authorized,
    CurrentUser,
    HttpCode,
    // NotFoundError
  } from 'routing-controllers'
  import Project from './entity'
  import User from '../users/entity'
  import {io} from '../index'
  
  @JsonController()
  export default class ProjectController {
    
    @Authorized()
    @Get('/projects')
    async getAllProjects(
      @CurrentUser() user: User
    ) {
      return await Project.find({where:{user}})
     
    }
  
    @Authorized()
    @Get('/projects/:id')
    async getProject(
      @Param('id') id: number,
      @CurrentUser() user:User
      ) {
      // return await Project.findOne({where:{id,user},relations:["messages"]})
      return await Project.findOne({where:{id,user}})
     
    }
  
    @Authorized()
    @Post('/projects')
    @HttpCode(201)
    async createProject(
      @CurrentUser() user: User,
      @Body() project: Project
    ) {
      const entity = await Project.create({
      ...project,
      user
      })
      
      io.emit('action', {
        type: 'ADD_PROJECT',
        payload: entity
      })
  
      return entity
    }
  
    // @Authorized()
    // @Put('/projects/:id')
    // async updateProject(
    //   @Param('id') id: number,
    //   @Body() update: Partial<Event>
    // ) {
    //   const project = await Event.findOneById(id)
    //   if (!project) throw new NotFoundError('Project not found')
  
    //   return Project.merge(project, update).save()
    // }
  
  }
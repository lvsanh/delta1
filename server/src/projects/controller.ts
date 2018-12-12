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
  
    @Get('/projects')
    async getAllProjects() {
      const projects = await Project.find()
      return { projects }
    }
  
    @Get('/projects/:id')
    async getProject(
      @Param('id') id: number
    ) {
      const project = await Project.findOneById(id)
      return project
    }
  
    @Authorized()
    @Post('/projects')
    @HttpCode(201)
    async createProject(
      @CurrentUser() user: User,
      @Body() project: Project
    ) {
      const entity = await project.save()
      entity.user = user

      io.emit('action', {
        type: 'ADD_PROJECT',
        payload: entity
      })
  
      return entity.save()
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
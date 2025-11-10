import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Messaging Platform',
      description: 'A bulk SMS management system handling high-volume message queuing, delivery tracking, and analytics. Built for telecom scale with support for thousands of concurrent messages.',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'RabbitMQ', 'Docker'],
      imageUrl: 'assets/images/messaging-platform.jpg',
      githubUrl: 'https://github.com/yourusername/messaging-platform',
      featured: true,
      category: 'web'
    },
    {
      id: 2,
      title: 'AI Text Analytics Dashboard',
      description: 'Text analysis tool that processes customer messages using NLP techniques. Provides sentiment analysis, keyword extraction, and trend detection for business intelligence.',
      technologies: ['Django', 'Angular', 'PostgreSQL', 'scikit-learn', 'NLTK'],
      imageUrl: 'assets/images/text-analytics.jpg',
      githubUrl: 'https://github.com/yourusername/text-analytics',
      featured: false,
      category: 'web'
    },
    {
      id: 3,
      title: 'Customer Queue Management System',
      description: 'Digital queue system for service centers with real-time updates, SMS notifications, and analytics dashboard. Reduces wait times and improves customer experience.',
      technologies: ['Angular', '.NET Core', 'SignalR', 'SQL Server', 'Docker'],
      imageUrl: 'assets/images/queue-system.jpg',
      githubUrl: 'https://github.com/yourusername/queue-management',
      featured: false,
      category: 'web'
    },
    {
      id: 4,
      title: 'Loyalty Points System',
      description: 'B2B loyalty program platform allowing businesses to create point-based reward systems for their customers. Includes transaction tracking, redemption management, and reporting.',
      technologies: ['Angular', 'Django', 'MySQL', 'Redis', 'Docker'],
      imageUrl: 'assets/images/loyalty-system.jpg',
      githubUrl: 'https://github.com/yourusername/loyalty-system',
      featured: false,
      category: 'web'
    }
  ];

  private projectsSubject = new BehaviorSubject<Project[]>(this.projects);

  constructor() { }

  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  getFeaturedProjects(): Observable<Project[]> {
    return new Observable(observer => {
      observer.next(this.projects.filter(project => project.featured));
      observer.complete();
    });
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return new Observable(observer => {
      observer.next(this.projects.find(project => project.id === id));
      observer.complete();
    });
  }

  addProject(project: Project): void {
    this.projects = [...this.projects, project];
    this.projectsSubject.next(this.projects);
  }

  updateProject(updatedProject: Project): void {
    this.projects = this.projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    this.projectsSubject.next(this.projects);
  }

  deleteProject(id: number): void {
    this.projects = this.projects.filter(project => project.id !== id);
    this.projectsSubject.next(this.projects);
  }
}

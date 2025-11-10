import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interfaces/project.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  featuredProject: Project | null = null;
  projects: Project[] = [];
  private destroy$ = new Subject<void>();

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    // Get featured projects
    this.projectService.getFeaturedProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(featured => {
        this.featuredProject = featured.length > 0 ? featured[0] : null;
      });

    // Get all projects (excluding the featured one for the grid)
    this.projectService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(allProjects => {
        this.projects = allProjects.filter(p => !p.featured);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

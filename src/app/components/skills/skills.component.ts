import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  frontendSkills: Skill[] = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'HTML5/CSS3', level: 92 },
    { name: 'SCSS', level: 85 },
    { name: 'RxJS', level: 80 },
    { name: 'Responsive Design', level: 88 }
  ];

  backendSkills: Skill[] = [
    { name: '.NET Core', level: 85 },
    { name: 'Django', level: 82 },
    { name: 'RESTful APIs', level: 90 },
    { name: 'SQL Server', level: 88 },
    { name: 'Oracle', level: 82 },
    { name: 'MySQL', level: 85 }
  ];

  otherSkills: Skill[] = [
    { name: 'Docker', level: 80 },
    { name: 'Git/GitHub', level: 88 },
    { name: 'AI/Machine Learning', level: 75 },
    { name: 'Text Analytics', level: 78 },
    { name: 'System Architecture', level: 82 },
    { name: 'Database Design', level: 85 }
  ];

  additionalSkills: string[] = [
    'Bulk Messaging Systems',
    'Queue Management',
    'Loyalty Programs',
    'Fuel Management Systems',
    'Natural Language Processing',
    'Enterprise Software',
    'Microservices',
    'API Integration',
    'Performance Optimization',
    'Agile Development'
  ];

  ngOnInit() {
    // Component initialization
  }
}

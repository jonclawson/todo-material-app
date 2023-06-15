import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'active'];
  dataSource: MatTableDataSource<Task>;
  tasks: Task[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private taskService: TaskService) {
    this.loadTasks();
  }

  addTask(task: Task) {
    this.taskService.create(task);
    this.loadTasks();
  }

  removeTask(id: number) {
    this.taskService.delete(id);
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.list();
    this.tasks.sort((a, b) => a.id < b.id ? -1 : 1).reverse();
    this.setDataSource();
  }

  updateTask(task: Task) {
    this.taskService.update(task);
    this.loadTasks();
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(
      this.tasks.filter((t) => t.active)
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.setDataSource();
  }

  openDialog(row: any) {
    const dialogRef = this.dialog.open(DialogComponent, { data: Object.assign({}, row) });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!result.id) {
          this.addTask(result);
        } else {
          this.updateTask(result);
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

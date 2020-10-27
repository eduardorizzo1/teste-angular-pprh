import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersDetailsComponent } from '../users-details/users-details.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['username', 'email'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getList();
    this.paginatorConfigs();
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property.includes('.'))
        return property.split('.').reduce((o, i) => o[i], item);
      return item[property];
    };
  }

  getList() {
    this.userService.getUsersList().subscribe(
      (users) => {
        this.dataSource.data = users.sort((a: any, b: any) => a.name - b.name);
        this.users = users;
      },
      () => {
        alert('Ocorreu um erro ao buscar os dados.');
      }
    );
  }

  getDetails(user: User): void {
    this.dialog.open(UsersDetailsComponent, {
      data: user,
    });
  }

  // Configurações adicionais para tornar a paginação em português //
  paginatorConfigs() {
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.getRangeLabel = this.ptRangeLabel;
    this.dataSource.paginator = this.paginator;
  }

  ptRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex}  de  ${length}`;
  };
}

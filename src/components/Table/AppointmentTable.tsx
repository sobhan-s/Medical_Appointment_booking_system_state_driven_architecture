import React, { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../context/app.contexts';
import { useDebounce } from '../../hooks/useDebounce';
import { formatDate, appointmentToFormData } from '../../utils';
import type { AppointmentFormData } from '../../types/form.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '../../hooks/use-toast';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AppointmentTableProps {
  onAddClick: () => void;
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  onAddClick,
}) => {
  const {
    appointments,
    deleteAppointment,
    setEditMode,
    setFormData,
    setCurrentStep,
    setModalOpen,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    setSortField,
    toggleSortDirection,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useAppStore();

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = [...appointments];

    if (debouncedSearchQuery) {
      filtered = filtered.filter((apt) =>
        apt.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;

        return 0;
      });
    }

    return filtered;
  }, [appointments, debouncedSearchQuery, sortField, sortDirection]);

  const totalPages = Math.ceil(
    filteredAndSortedAppointments.length / itemsPerPage,
  );
  const paginatedAppointments = filteredAndSortedAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: keyof AppointmentFormData) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
    }
  };

  const handleEdit = (appointment: AppointmentFormData) => {
    setEditMode(true, appointment.id);
    setFormData(appointmentToFormData(appointment));
    setCurrentStep(1);
    setModalOpen(true);

    toast({
      title: '📝 Edit Mode',
      description: 'You can now edit the appointment details.',
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (
      window.confirm(`Are you sure you want to delete ${name}'s appointment?`)
    ) {
      deleteAppointment(id);
      toast({
        title: '🗑️ Appointment Deleted',
        description: `${name}'s appointment has been removed.`,
        variant: 'destructive',
      });
    }
  };

  const SortIcon = ({ field }: { field: keyof AppointmentFormData }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="tableContainer space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={onAddClick}
          className="w-full sm:w-auto bg-primary hover:bg-primary-dark"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Appointment
        </Button>
      </div>

      <div className="hidden lg:block tableWrapper border rounded-lg">
        <Table>
          <TableHeader className="tableHead bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark]">
            <TableRow>
              <TableHead className="text-[--color-text]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('appointmentDate')}
                  className=" hover:text-white/90 hover:bg-white/10"
                >
                  Date
                  <SortIcon field="appointmentDate" />
                </Button>
              </TableHead>
              <TableHead className="text-[--color-text]">
                Time Slot
              </TableHead>
              <TableHead className="text-[--color-text]">
                Patient Name
              </TableHead>
              <TableHead className="text-[--color-text]">Email</TableHead>
              <TableHead className="text-[--color-text]">Phone</TableHead>
              <TableHead className="text-[--color-text]">
                Doctor
              </TableHead>
              <TableHead className="text-[--color-text]">
                Reason
              </TableHead>
              <TableHead className="text-[--color-text] whitespace-nowrap">
                Health Concerns
              </TableHead>
              <TableHead className="text-[--color-text]">
                Medications
              </TableHead>
              <TableHead className="text-[--color-text]">
                Allergies
              </TableHead>
              <TableHead className="text-[--color-text] whitespace-nowrap">
                Medical Record
              </TableHead>
              <TableHead className="text-[--color-text]">
                Consultation
              </TableHead>
              <TableHead className="text-[--color-text] ">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center py-12 text-[--color-text-white]">
                  <div className="noAppointment">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No appointments found
                    </h3>
                    <p className="text-gray-500">
                      {searchQuery
                        ? 'Try adjusting your search criteria'
                        : 'Click "Add Appointment" to create one'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedAppointments.map((apt) => (
                <TableRow key={apt.id} className="hover:bg-muted/50 text-[--color-text-white]">
                  <TableCell className="font-semibold">
                    {formatDate(apt.appointmentDate)}
                  </TableCell>
                  <TableCell className=' whitespace-nowrap text-[--color-text-white]'>{apt.timeSlot}</TableCell>
                  <TableCell className="font-semibold whitespace-nowrap text-[--color-text-white]">{apt.name}</TableCell>
                  <TableCell className='text-[--color-text-white]'>{apt.email}</TableCell>
                  <TableCell className='text-[--color-text-white]'>{apt.phonePrefix + apt.phone}</TableCell>
                  <TableCell className="doctor whitespace-nowrap text-[--color-text-white]">
                    {apt.doctor}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-[--color-text-white]">
                    {apt.reasonForVisit}
                  </TableCell>
                  <TableCell className='text-[--color-text-white]'>
                    <div className="healthConcerns flex gap-1 whitespace-nowrap">
                      {apt.healthConcerns.map((concern, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="eachHealthTag bg-primary-light text-[--color-text-white]"
                        >
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className='text-[--color-text-white]'>{apt.medications || '-'}</TableCell>
                  <TableCell className='text-[--color-text-white]'>{apt.allergies || '-'}</TableCell>
                  <TableCell className='text-[--color-text-white]'>{apt.medicalRecord}</TableCell>
                  <TableCell className="whitespace-nowrap text-[--color-text-white]">
                    {apt.consultationType}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="internalBtn flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(apt)}
                        className="update_btn update h-8 w-8 bg-slate-100 hover:bg-blue-500 hover:text-white"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(apt.id, apt.name)}
                        className="delete_btn delete h-8 w-8 bg-slate-100 hover:bg-red-500 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="lg:hidden space-y-4">
        {paginatedAppointments.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? 'Try adjusting your search criteria'
                  : 'Click "Add Appointment" to create one'}
              </p>
            </CardContent>
          </Card>
        ) : (
          paginatedAppointments.map((apt) => (
            <Card key={apt.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark] text-white pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{apt.name}</CardTitle>
                    <p className="text-sm text-white/90 mt-1">
                      {formatDate(apt.appointmentDate)} • {apt.timeSlot}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                      >
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(apt)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(apt.id, apt.name)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{apt.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{apt.phonePrefix + apt.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Doctor</p>
                    <p className="font-medium">{apt.doctor}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Consultation</p>
                    <p className="font-medium text-xs">
                      {apt.consultationType}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Reason for Visit
                  </p>
                  <p className="text-sm">{apt.reasonForVisit}</p>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    Health Concerns
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {apt.healthConcerns.map((concern, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary-light text-white text-xs"
                      >
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </div>

                {(apt.medications || apt.allergies) && (
                  <div className="grid grid-cols-2 gap-3 text-sm pt-2 border-t">
                    <div>
                      <p className="text-muted-foreground">Medications</p>
                      <p className="font-medium">{apt.medications || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Allergies</p>
                      <p className="font-medium">{apt.allergies || '-'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(
              currentPage * itemsPerPage,
              filteredAndSortedAppointments.length,
            )}{' '}
            of {filteredAndSortedAppointments.length} appointments
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const TableSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="border rounded-lg">
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

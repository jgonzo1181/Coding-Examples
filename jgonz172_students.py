# Jesus Gonzalez CIS 345 T/TH 10:30 PE9

# TODO: Student class
class Student:
    def __init__(self, first=''):
        self.fname = first
        self.lname = ''

    @property
    def fname(self):
        return self.__fname.upper()

    @fname.setter
    def fname(self, first):
        if first.isalpha() and len(first) >= 1:
            self.__fname = first.upper()
        else:
            self.__fname = 'Unknown'

    @property
    def lname(self):
        return self.__lname.upper()

    @lname.setter
    def lname(self, last):
        if last.isalpha() and len(last) >= 1:
            self.__lname = last.upper()
        else:
            self.__lname = 'Unknown'

    def __str__(self):
        return f'{self.__fname} {self.__lname}'


# TODO: GradStudent class
class GraduateStudent(Student):
    def __init__(self, thesis, first=''):
        super().__init__(first)
        self.thesis = thesis

    @property
    def thesis(self):
        return self.__thesis.upper()

    @thesis.setter
    def thesis(self, thesis):
        self.__thesis = 'THESIS: ' + thesis

    def __str__(self):
        fullname = super().__str__()
        return f'{fullname}\n\t{self.thesis}'


# TODO: PhDStudent class
class PhDStudent(Student):
    def __init__(self, dissertation, first=''):
        super().__init__(first)
        self.dissertation = dissertation

    @property
    def dissertation(self):
        return self.__dissertation.upper()

    @dissertation.setter
    def dissertation(self, dissertation):
        self.__dissertation = 'DISSERTATION: ' + dissertation


def add_student(studentType):
    """Get student data and create an object to be returned"""
    student = None
    # Get first and last name here because all students need this data
    first = input('Enter first name: ')
    last = input('Enter last name: ')

    # TODO: Determine student type and construct an object and save in student
    if studentType == 'G':
        thesis_title = input('Enter thesis title: ')
        student = GraduateStudent(thesis_title, first)
    elif studentType == 'P':
        dissertation_title = input('Enter dissertation title: ')
        student = PhDStudent(dissertation_title, first)
    else:
        student = Student(first)

    # TODO: Assign last_name using our object's property then return student
    student.lname = last
    return student

# Main Function
def main():
    """Main program logic"""
    students = []
    entry = ''
    print('{:^50}'.format('Student Management System'))

    while entry != 'X':
        studentTypes = ['S', 'G', 'P']
        # Get user entry and capitalize the entry
        entry = input(
            f'\nEnter (S)tudent, (G)radStudent, (P)hDStudent or (X)exit: ')
        entry = entry.upper()

        # TODO: Is user entry one of studentTypes. Yes - add_student to list
        if entry in studentTypes:
            new_student = add_student(entry)
            students.append(new_student)

    # TODO: print students and dissertation if the student is a PhD type
    print(f'\nThe following students were added...')
    for student in students:
        print(student)
        if isinstance(student, PhDStudent):
            print(f'\t{student.dissertation}')


if __name__ == "__main__":
    # call and execute the main function
    main()

# Library used

1. **Flask** ==> Flask is a microframework for Python, Used to create API endpoints.

2. **Pymongo** ==> For connection and perform the database tasks.

3. **Flask_cors** ==> For handling the CROS requests accross diffrent domain.

4. **Pandas** ==> Pandas is an open source, providing high-performance, easy-to-use data structures and data analysis tools for the Python programming language.

5. **Numpy** ==> NumPy is the fundamental package for scientific computing with Python.

6. **SciPy** ==> SciPy is a free and open-source Python library used for scientific computing and technical computing.

***

## Triangle Logic

1. Get raw data from Database.

2. Convert that data into pandas data formate.

3. Delete duplicate data.

4. Read the volume data column and save it to variable.

5. Then process one by one volume data using for loop as below.

### **Finding min points**

Find the minimum points by creating subarray of volume data that each contain 10 volume data.

### **Finding max points**

Find the maximum points by creating subarray of volume data that each contain 10 volume data.

1. Concatenation of minumum and maximum array and assign to one array.
2. Sort that array in ascending order.
3. Take the last 3 values from current index of sorted array.
4. Get that 3 values of volume index in one array.
5. Let assume 3 values of volume:

    ```math
    X = 40.6, A = 42.52, B = 29.63

    XA = A-X = 1.92
    AB = B-A = -12.89
    ```

    If XA is greater then 0 and AB is less then 0 then it will be our triangle.

6. Add triangle pattern into one new array with three diffrent subarray which contains two values which is date and volume of that index.

    **i.e:**

    ```math
    [ [date, volume(lower point)], [date, volume(peck point)], [date, volume(minimum point)] ]
    ```

7. Then find best triangle from above array by taking the best peak point which has all same starting points and same ending points.

    **For example:**

    ```math
    [ [date, 10] ,[date, 20],[date, 30] ], [ [date,10], [date,21] , [date,30] ], [ [date, 10], [date, 25] , [date,30] ] ]
    ```

    From above array find the max peak point value and take that value as best value and save that into one variable.

8. When process of loop is completed, then save the patterns into one variable and send back to user to show in frontend.

***
***
***

## **Find Trending Triangle Logic**

1. Get data from database.

2. Convert data to pd(pandas) formate.

3. Find `min_point` and `max_point` according to above logic, so we got like this -

    **i.e**

    ```python
    min_point = [value,value,value,...]

    max_point = [value,value,value,...]
    ```


### Data Filteration

* Then according to min and max points, find date of that points and save in other variable. - So now we have `min_point` and `max_point` along with date & time. Now we have -

    **i.e**

    ```python
    min_point = [ [date,value], [date,value] , ... ]

    max_point = [ [date,value], [date,value] , ... ]
    ```

***

### **Now we find pattern**

* **For bottom line:**

     For pattern take first 10 value from `min_point` and add 1st value to `top_line` array, then compare remaining 9 values with 1st value and if that value is greter then 1st value then we add that in that array.

    _loop untill `min_point` length_

* **For top line:**

     For pattern take first 10 value from `max_point` and add 1st value to `top_line` array, then compare remaining 9 values with 1st value and if that value is less then 1st value then we add that in that array.

    _loop untill `max_point` length_

* Now we have 2 sorted array of array

    **i.e**

    ```python
    top_line = [ [date,value],[date,value],... ]

    bottom_line = [ [date,value],[date,value],... ]
    ```

* Now for final part add 1st value from `top_line` add into `final_top_line` and for last point compare the last point's date of `top_line` & `bottom_line` and take largest date point and add to `final_top_line`.

    **i.e**

    ```python
    final_top_line = [[date,1225],[date,1102]]
    ```

* Now for final part add 1st value from `bottom_line` add into `final_bottom_line` and for last point compare the last point's date of `bottom_line` & `bottom_line` and take largest date point and add to `final_bottom_line`.
  
    **i.e**

    ```python
    final_bottom_line = [[date,1030],[date,1102]]
    ```

* _last point of `final_top_line` & `final_bottom_line` must be same._

* Then send `final_top_line` & `final_bottom_line` to user for display in frontend.
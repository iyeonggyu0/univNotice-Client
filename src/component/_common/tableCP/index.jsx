import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

const TableCP = ({
  columns = [],
  rows = [],
  order = "desc",
  orderBy = "",
  onSort = () => {},
  page = 0,
  rowsPerPage = 10,
  totalCount = 0, // 전체 데이터 개수 추가
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  loading = false,
  onRowClick = () => {},
  style = {},
}) => {
  return (
    <Box sx={{ width: "100%", mt: 2, ...style }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="small">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col} sortDirection={orderBy === col ? order : false}>
                    <TableSortLabel active={orderBy === col} direction={orderBy === col ? order : "asc"} onClick={() => onSort(col)}>
                      {col}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    로딩 중...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    데이터 없음
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, idx) => (
                  <TableRow key={idx} onClick={() => onRowClick(row)} style={{ cursor: "pointer" }} hover>
                    {columns.map((col) => (
                      <TableCell key={col}>{typeof row[col] === "object" && row[col] !== null ? JSON.stringify(row[col]) : row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};
export default TableCP;

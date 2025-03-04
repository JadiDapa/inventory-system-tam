/* eslint-disable jsx-a11y/alt-text */
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { numberToWords } from "@/lib/numberToWord";
import { ConsumeType } from "@/lib/types/consume";
import { ConsumeItemType } from "@/lib/types/consume-item";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },

  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },

  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },

  logo: { width: 120 },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginVertical: 12,
  },

  reportTitle: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "black",
    fontStyle: "italic",
    color: "#00467f",
  },

  addressTitle: { fontSize: 11, fontStyle: "bold" },

  invoice: { fontWeight: "bold", fontSize: 20 },

  invoiceNumber: { fontSize: 11, fontWeight: "bold", marginTop: 4 },

  address: { fontWeight: 400, fontSize: 10 },

  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    color: "#111111",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },
});

interface ConsumeInvoiceProps {
  consume: ConsumeType;
}

export default function ConsumeInvoice({ consume }: ConsumeInvoiceProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeader />
        <View style={styles.separator} />
        <InvoiceTitle />
        <InvoiceDetail consume={consume} />
        <TableHead />
        <TableBody consumeItems={consume.ConsumeItem} />
        <TableFooter />
      </Page>
    </Document>
  );
}

const InvoiceHeader = () => (
  <View style={styles.titleContainer}>
    <View style={{ fontSize: 8, lineHeight: 1.5 }}>
      <Text style={{ fontSize: 10, fontStyle: "bold", color: "#00467f" }}>
        PT. Taruna Anugrah Mandiri
      </Text>
      <Text>Jl. RE Martadinata No 2091</Text>
      <Text>Palembang - Sumatera Selatan 30116</Text>
      <Text>Ph: +62-711-71060 Fax: +62-711-56267100</Text>
      <Text>Email: info@tarunagroup.co.id</Text>
    </View>
    <View style={{ fontSize: 8, lineHeight: 1.5, paddingTop: 12 }}>
      <Text>Jalan Daan Mogot E-19-21</Text>
      <Text>Komplek Ruko Arcadia, Jakarta</Text>
      <Text>Ph: +62-21-5576-5299</Text>
    </View>
    <Image style={styles.logo} src={"/images/logo.png/"} />
  </View>
);

const InvoiceTitle = () => (
  <View style={{ flexDirection: "column", alignItems: "center" }}>
    <Text style={{ fontSize: 10, textDecoration: "underline" }}>
      SURAT JALAN
    </Text>
    <Text>Nomor : B.250/002/TAM/2025</Text>
  </View>
);

const InvoiceDetail = ({ consume }: { consume: ConsumeType }) => {
  const day = format(consume.createdAt, "EEEE", { locale: id });
  const date = numberToWords(parseInt(format(consume.createdAt, "d")));
  const month = format(consume.createdAt, "MMMM", { locale: id });
  const fullDate = format(consume.createdAt, "dd-MM-yyyy", { locale: id });

  return (
    <View style={{ marginTop: 24 }}>
      <View>
        <Text>Kepada Yth,</Text>
        <Text>DINAS KOMINFO KOTA</Text>
        <Text>Palembang, Sumatera Selatan</Text>
      </View>
      <View style={{ marginTop: 24 }}>
        <Text>Dengan Hormat,</Text>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text>
          Pada hari ini, {day}, tanggal {date} bulan {month} tahun Dua Ribu Dua
          Puluh Lima ({fullDate})
        </Text>
        <Text>
          Bersama dengan surat ini, kami kirimkan barang/jasa dengan rincian :
        </Text>
      </View>
    </View>
  );
};

// const Address = ({ consumeId, status }: { consumeId: string; status: string }) => (
//   <View style={styles.titleContainer}>
//     <View style={styles.spaceBetween}>
//       <View>
//         <Text style={styles.invoice}>Items consume </Text>
//         <Text style={styles.invoiceNumber}>Invoice number: {consumeId} </Text>
//       </View>
//       <View>
//         <Text style={styles.addressTitle}>{status}</Text>
//       </View>
//     </View>
//   </View>
// );

const TableHead = () => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      display: "flex",
      marginTop: 10,
      backgroundColor: "#00467f",
      color: "#FFFFFF",
    }}
  >
    <View style={{ ...styles.tbody, width: "5%" }}>
      <Text>No</Text>
    </View>
    <View style={{ ...styles.tbody, width: "20%" }}>
      <Text>Product</Text>
    </View>
    <View style={{ ...styles.tbody, width: "20%" }}>
      <Text>Brand</Text>
    </View>
    <View style={{ ...styles.tbody, width: "20%" }}>
      <Text>Type</Text>
    </View>
    <View style={{ ...styles.tbody, width: "25%" }}>
      <Text>Serial Number</Text>
    </View>
    <View style={{ ...styles.tbody, width: "10%" }}>
      <Text>QTY</Text>
    </View>
  </View>
);

const TableBody = ({ consumeItems }: { consumeItems: ConsumeItemType[] }) =>
  consumeItems.map((item, index) => (
    <>
      <View key={index} style={{ width: "100%", flexDirection: "row" }}>
        <View style={{ ...styles.tbody, width: "5%" }}>
          <Text>{index + 1} </Text>
        </View>
        <View style={{ ...styles.tbody, width: "20%" }}>
          <Text>{item.Item.Product.name}</Text>
        </View>
        <View style={{ ...styles.tbody, width: "20%" }}>
          <Text>{item.Item.Brand.name} </Text>
        </View>
        <View style={{ ...styles.tbody, width: "20%" }}>
          <Text>{item.Item.name}</Text>
        </View>
        <View style={{ ...styles.tbody, width: "25%" }}>
          {item.SerialNumber.map((sn) => (
            <Text key={sn.id}>{sn.number}</Text>
          ))}
        </View>
        <View style={{ ...styles.tbody, width: "10%" }}>
          <Text>
            {item.quantity > 0 ? item.quantity : item.SerialNumber.length}
          </Text>
        </View>
      </View>
    </>
  ));

// const TableTotal = ({ consumeItems }: { consumeItems: consumeItemType[] }) => (
//   <View style={{ width: "100%", flexDirection: "row" }}>
//     <View style={styles.total}>
//       <Text></Text>
//     </View>
//     <View style={styles.total}>
//       <Text> </Text>
//     </View>
//     <View style={styles.tbody}>
//       <Text>Total</Text>
//     </View>
//     <View style={styles.tbody}>
//       <Text>
//         {consumeItems.reduce(
//           (sum, item) => Number(sum) + Number(item.quantity),
//           0,
//         )}
//       </Text>
//     </View>
//   </View>
// );

function TableFooter() {
  return (
    <View style={{ width: "100%" }}>
      <Text>
        Surat Jalan ini berfungsi sebagai bukti pengiriman barang/jasa pekerjaan
        kepada pemesan. Demikian Surat Jalan ini dibuat dengan sebenarnya untuk
        di pergunakan sebagaimana mestinya
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "10px 20px",
          width: "100%",
        }}
      >
        <View
          style={{
            width: "15%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>Penerima</Text>
          <View
            style={{
              marginTop: 40,
              width: "100%",
              height: 1,
              backgroundColor: "black",
            }}
          />
        </View>
        <View
          style={{
            width: "15%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>Pengirim</Text>
          <View
            style={{
              marginTop: 40,
              width: "100%",
              height: 1,
              backgroundColor: "black",
            }}
          />
        </View>
      </View>
    </View>
  );
}

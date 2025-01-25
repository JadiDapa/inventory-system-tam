import { EntryType } from "@/lib/types/entry";
import { EntryItemType } from "@/lib/types/entry-item";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

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

  titleContainer: { flexDirection: "row", marginTop: 12 },

  logo: { width: 90 },

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
    // backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
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

  tbody2: { flex: 2, borderRightWidth: 1 },
});

interface EntryInvoiceProps {
  entry: EntryType;
}

export default function EntryInvoice({ entry }: EntryInvoiceProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle title="INVENTORY" logo="/images/logo.png/" />
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            margin: "24px 0",
          }}
        >
          <View
            style={{
              width: "30%",
              height: 3,
              backgroundColor: "#00467f",
            }}
          />
          <View
            style={{
              width: "70%",
              height: 3,
              backgroundColor: "#4c4c4c",
            }}
          />
        </View>

        <Address entryId={entry.id} status={entry.status} />
        <TableHead />
        <TableBody entryItems={entry.EntryItems} />
        <TableTotal entryItems={entry.EntryItems} />
      </Page>
    </Document>
  );
}

const InvoiceTitle = ({ title, logo }: { title: string; logo: string }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <Image style={styles.logo} src={logo} />
      <Text style={styles.reportTitle}>{title}</Text>
    </View>
  </View>
);

const Address = ({ entryId, status }: { entryId: string; status: string }) => (
  <View style={styles.titleContainer}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Items Entry </Text>
        <Text style={styles.invoiceNumber}>Invoice number: {entryId} </Text>
      </View>
      <View>
        <Text style={styles.addressTitle}>{status}</Text>
      </View>
    </View>
  </View>
);

const TableHead = () => (
  <View
    style={{
      width: "100%",
      flexDirection: "row",
      marginTop: 10,
      backgroundColor: "#00467f",
      color: "#FFFFFF",
    }}
  >
    <View style={[styles.tbody, styles.tbody2]}>
      <Text>Product</Text>
    </View>
    <View style={styles.tbody}>
      <Text>Brand</Text>
    </View>
    <View style={styles.tbody}>
      <Text>Type</Text>
    </View>
    <View style={styles.tbody}>
      <Text>Code/SN</Text>
    </View>
    <View style={styles.tbody}>
      <Text>QTY</Text>
    </View>
  </View>
);

const TableBody = ({ entryItems }: { entryItems: EntryItemType[] }) =>
  entryItems.map((item) => (
    <>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{item.Items.Product.name}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.Items.Brand.name} </Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.Items.name}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.itemCode}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.quantity}</Text>
        </View>
      </View>
    </>
  ));

const TableTotal = ({ entryItems }: { entryItems: EntryItemType[] }) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>Total</Text>
    </View>
    <View style={styles.tbody}>
      <Text>
        {entryItems.reduce(
          (sum, item) => Number(sum) + Number(item.quantity),
          0,
        )}
      </Text>
    </View>
  </View>
);

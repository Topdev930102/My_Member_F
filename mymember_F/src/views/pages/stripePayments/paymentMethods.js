import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const RenderLabel = ({ item }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      paddingRight: "5px",
      width: "220px",
    }}
  >
    <Box>
      <Typography
        sx={{
          margin: "0px !important",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        {`${item?.brand?.trim().substring(0, 10)}...`}
      </Typography>
      <Typography
        sx={{ margin: "0px !important" }}
      >{`xxxx xxxx ${item?.last4}`}</Typography>
    </Box>
    <Box>
      <Typography
        sx={{
          margin: "0px !important",
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        expire by{" "}
      </Typography>
      <Typography
        sx={{ margin: "0px !important" }}
      >{`${item?.exp_month}/${item?.exp_year}`}</Typography>
    </Box>
  </Box>
);

const Cards = ({ item, setStripePayload }) => {
  return (
    <ListItem
      sx={{
        paddingX: "8px",
        marginBottom: "10px",
        background: "#f6f6f6",
        border: "none",
        boxShadow: "0px 0px 2px 3px rgb(242 239 242)",
        fontSize: "16px",
        "&:hover": {
          border: "1px solid",
          borderColor: "#2796f3",
        },
      }}
      variant="outlined"
      key={item?.card_id}
    >
      <ListItemIcon
        sx={{
          minWidth: "25px",
        }}
      >
        <CreditCardIcon />
      </ListItemIcon>
      <FormControlLabel
        value={item?.card_id}
        control={<Radio />}
        label={<RenderLabel item={item} />}
        labelPlacement="start"
        onChange={() => {
          setStripePayload({
            stripePaymentMethod: "existingCard",
            card_id: item?.card_id,
            email: item?.email,
            customer_id: item?.customer_id,
          });
        }}
        sx={{
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      />
    </ListItem>
  );
};

export default function PaymentMethods({
  stripePaymentMethodList,
  setStripePayload,
}) {
  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="Payment Method"
          name="card_id"
          defaultValue={stripePaymentMethodList[0]?.card_id}
        >
          <List
            sx={{
              minWidth: 310,
              "--List-gap": "0.8rem",
              "--List-item-paddingY": "1rem",
              "--List-item-radius": "8px",
            }}
          >
            {stripePaymentMethodList?.map((item, index) => (
              <Cards
                key={index}
                item={item}
                index={index}
                setStripePayload={setStripePayload}
              />
            ))}
          </List>
        </RadioGroup>
      </FormControl>
    </>
  );
}

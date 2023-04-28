import { Card } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { makeStyles } from "@material-ui/styles";
import InfoCard from "./InfoCard";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { get_ticket_by_id } from "../../../../redux/actions/marketing/ticket";
import { SOCKET_CONNECTER_IO } from "../../../../redux/actions/socket.io";
const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 220px)",
  },
  messageBodyCard: {
    padding: "30px",
    width: "100%",
    marginRight: "1rem",
    height: "100%",
  },
  infoPanel: {
    width: "400px",
  },
});

const TicketDetailPage = (props) => {
  const classes = useStyle();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Rendering hook functions
  useEffect(scrollToBottom, [ticket]);

  useEffect(() => {
    (async () => {
      const response = await get_ticket_by_id(ticketId);
      setTicket(response);
      console.log("response is ", response);
    })();

    SOCKET_CONNECTER_IO().on("newEmail", async (data) => {
      const response = await get_ticket_by_id(ticketId);
      console.log("respose is", response);
      setTicket(response);
    })

    return function cleanup() {
      SOCKET_CONNECTER_IO().removeAllListeners();
    };
  }, []);



  const updateTicket = (newTicket) => {
    setTicket(newTicket);
  }

  return (
    <React.Fragment>
      <BreadCrumbs
        breadCrumbTitle={ticket.ticketName} // Ticket Name
        breadCrumbParent="ticket"
        breadCrumbActive="Detail"
      />
      <div className={classes.container}>
        <Card className={classes.messageBodyCard}>
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                flex: "1 1 auto",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {ticket &&
                ticket.messages &&
                ticket.messages.length > 0 &&
                ticket.messages.map((message) => {
                  return <Message
                    type={message.sender}
                    senderName={message.sender === "requester_msg" ? ticket.reqName : "You"}
                    message={message.msg}
                    dateTime={(new Date(message.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    ))}
                  />;
                })}
              <div style={{ display: "inline-block" }}>
                Xing Liao changed ticket status from <b>Open</b> to{" "}
                <b>Pending</b>
              </div>
              <div ref={messagesEndRef} />
            </div>
            <div
              style={{
                display: "flex",
                flex: "0 0 auto",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MessageInput ticket={ticket} setTicket={updateTicket} />
            </div>
          </div>
        </Card>
        <div className={classes.infoPanel}>
          <InfoCard ticket={ticket} />
          <InfoCard />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tickets: state.ticket.tickets,
  };
};

export default connect(mapStateToProps, {})(TicketDetailPage);

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        
        <table>
				<tr>
					<td>
                        <asp:Label ID="Label1" runat="server" Text="Username:" AssociatedControlID="TextBox1"></asp:Label>
					</td>
					<td>
                        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
					</td>
				</tr>
			
				<tr>
					<td>
                        <asp:Label ID="Label2" runat="server" Text="Password:" AssociatedControlID="TextBox2"></asp:Label>
					</td>
					<td>
                        <asp:TextBox ID="TextBox2" runat="server" TextMode="Password"></asp:TextBox>
					</td>
				</tr>
				
				<tr>
					<td>
                        <asp:Label ID="Label3" runat="server" Text="E-Mail:" AssociatedControlID="TextBox3"></asp:Label>
					</td>
					<td>
                        <asp:TextBox ID="TextBox3" runat="server"></asp:TextBox>
					</td>
				</tr>
				
				<tr>
					<td>
                        <asp:Label ID="Label4" runat="server" Text="Re-type E-Mail:" AssociatedControlID="TextBox4"></asp:Label>
					</td>
					<td>
                        <asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>
					</td>
				</tr>
				
				<tr>
					<td>
                        <asp:Label ID="Label5" runat="server" Text="Phone:" AssociatedControlID="TextBox5"></asp:Label>
					</td>
					<td>
                        <asp:TextBox ID="TextBox5" runat="server"></asp:TextBox>
					</td>
				</tr>
				
				<tr>
					<td>
                        <asp:Label ID="Label6" runat="server" Text="Age:" AssociatedControlID="TextBox6"></asp:Label>
					</td>
					<td>
                        <asp:TextBox ID="TextBox6" runat="server"></asp:TextBox>
					</td>
				</tr>
			
				<tr>
					<td colspan="2">
                        <asp:Button ID="Button1" runat="server" Text="Submit" OnClick="Button1_Click" />
						
						<!-- response here -->
						<span id="result"></span>
					</td>
				</tr>
			
			</table>

    </div>
    </form>

    <!-- import jquery core script file -->
    <script src="Scripts/jquery-2.1.4.min.js"></script>

    <!-- import jquery validation plug-in file -->
    <script src="Scripts/jquery.validate.min.js"></script>

    <!-- jquery code -->
		<script type="text/javascript">
		    function fun1()
			{

		        //code for jquery validation plug in
		        $("#form1").validate({

		            rules:
					{
					    TextBox1: { required: true },
					    TextBox2: { required: true, minlength: 2 },
					    TextBox3: { required: true, regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i },
					    TextBox4: { required: true, equalTo: '#TextBox3' },
					    TextBox5: { required: true },
					    TextBox6: { range: [18, 70] }
					},

		            messages:
					{
					    TextBox1: { required: "Username is required" },
					    TextBox2: { required: "Password is required", minlength: "Minimum length is 2" },
					    TextBox3: { required: "Email is required", regexp: "Enter a valid E-Mail" },
					    TextBox4: { equalTo: "Email and re-type email must be same" },
					    TextBox5: { required: "Phone is required" },
					    TextBox6: { range: "Age must be in between 18 and 70" }
					}

		        });

		        //for regular expressions
		        $.validator.addMethod('regexp', function (value, element, param) {
		            return this.optional(element) || param.test(value); // Compare with regular expression
		        });

		    }

			$(fun1);
		</script>

		<style type="text/css">
			body { font-family: 'Segoe UI'; font-size: 20px; }
			label.error { color: #f00; }
			input.error { border: 1px solid #f00; background-color: #fee; }
		</style>

</body>
</html>
